// search.js

'use strict';

const SEARCH_INDEX = require('./search.config');

// ======================
// CACHE SETUP
// ======================
const CACHE = new Map();
const CACHE_TTL = 30 * 1000;
const MAX_CACHE_ENTRIES = 500;

const MAX_QUERY_LENGTH = 200;
const MAX_QUERY_WORDS = 10;
const EXCERPT_LENGTH = 140;

// ======================
// HELPERS
// ======================
function normalizeQuery(query) {
  return query.trim().replace(/\s+/g, ' ');
}

function getWordCount(query) {
  return query.split(' ').length;
}

function truncate(text, max = EXCERPT_LENGTH) {
  if (!text || typeof text !== 'string') return null;
  return text.length > max ? text.slice(0, max).trim() + '…' : text;
}

function getByPath(obj, path) {
  if (!obj || !path) return null;
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function buildPreview(item, model) {
  const preview = model.preview;
  if (!preview) return null;

  // 🖼️ IMAGE
  let image = null;
  if (preview.image !== null) {
    const mediumUrl = getByPath(item, preview.image);
    const fallbackUrl =
      preview.image?.includes('.formats.medium.')
        ? getByPath(
            item,
            preview.image.replace('.formats.medium.url', '.url')
          )
        : null;

    const imageUrl = mediumUrl ?? fallbackUrl;

    if (imageUrl) {
      image = {
        url: imageUrl,
        alt: getByPath(item, preview.titolo),
      };
    }
  }

  // 📦 DATA
  const data = {};
  if (preview.data && typeof preview.data === 'object') {
    for (const [key, path] of Object.entries(preview.data)) {
      data[key] = getByPath(item, path);
    }
  }

  return {
    titolo: getByPath(item, preview.titolo),
    excerpt: truncate(getByPath(item, preview.excerpt)),
    image,
    data,
    slug: getByPath(item, preview.slug),
  };
}

function calculateScore({ item, model, query }) {
  let score = 0;
  let matchedInTitle = false;
  const q = query.toLowerCase();

  for (const field of model.fields) {
    const value = item[field];
    if (typeof value !== 'string') continue;

    const v = value.toLowerCase();

    if (v === q) {
      score += 25;
      if (field === 'titolo') matchedInTitle = true;
      continue;
    }

    if (v.includes(q)) {
      if (field === 'titolo') {
        score += 15;
        matchedInTitle = true;
      } else if (field.toLowerCase().includes('titolo')) {
        score += 10;
      } else if (field === 'content' || field === 'descrizione') {
        score += 3;
      } else {
        score += 5;
      }
    }
  }

  if (!matchedInTitle) score -= 5;
  if (typeof model.priority === 'number') score += model.priority * 10;

  return score;
}

// ======================
// SERVICE
// ======================
module.exports = ({ strapi }) => ({
  async search(query, locale, limit = 20) {
    if (!query) return [];

    const normalizedQuery = normalizeQuery(query);
    const wordCount = getWordCount(normalizedQuery);

    // 🚫 Query troppo lunga
    if (
      normalizedQuery.length > MAX_QUERY_LENGTH ||
      wordCount > MAX_QUERY_WORDS
    ) {
      return {
        meta: { query: normalizedQuery, total: 0 },
        results: [
          {
            type: 'system',
            label: 'System',
            total: 1,
            items: [
              {
                title: 'Ricerca troppo lunga',
                message:
                  'La ricerca è troppo lunga. Prova a usare meno parole o una frase più breve.',
              },
            ],
          },
        ],
      };
    }

    const cacheKey = `${locale}:${normalizedQuery}:${limit}`;
    const now = Date.now();

    const cached = CACHE.get(cacheKey);
    if (cached && cached.expiresAt > now) return cached.results;

    // ======================
    // SEARCH
    // ======================
    const flatResults = [];

    for (const model of SEARCH_INDEX) {
      if (!model?.uid || !model.kind || !model.fields?.length) continue;

      // 🧠 populate: solo se array NON vuoto
      const populate =
        Array.isArray(model.populate) && model.populate.length > 0
          ? model.populate.reduce((acc, p) => {
              acc[p] = true;
              return acc;
            }, {})
          : undefined;

      let entries = [];

      // -------- SINGLE
      if (model.kind === 'single') {
        const entry = await strapi.documents(model.uid).findFirst({
          locale,
          status: 'published',
          populate,
        });

        if (entry) {
          const hasMatch = model.fields.some((f) =>
            entry[f]?.toLowerCase?.().includes(normalizedQuery.toLowerCase())
          );
          if (hasMatch) entries = [entry];
        }
      }

      // -------- COLLECTION
      else {
        const filters = {
          $or: model.fields.map((f) => ({
            [f]: { $containsi: normalizedQuery },
          })),
        };

        entries = await strapi.documents(model.uid).findMany({
          filters,
          locale,
          status: 'published',
          populate,
          limit,
        });
      }

      // -------- SCORING + PREVIEW
      for (const item of entries) {
        const score = calculateScore({ item, model, query: normalizedQuery });
        if (score <= 0) continue;

        flatResults.push({
          type: model.typeSlug,
          label: model.typeLabel,
          score,
          item: {
            id: item.id,
            preview: buildPreview(item, model),
            score,
          },
        });
      }
    }

    // ======================
    // NO RESULTS
    // ======================
    if (flatResults.length === 0) {
      const empty = {
        meta: { query: normalizedQuery, total: 0 },
        results: [],
      };

      CACHE.set(cacheKey, { results: empty, expiresAt: now + CACHE_TTL });
      return empty;
    }

    // ======================
    // GROUPING
    // ======================
    const grouped = {};
    for (const r of flatResults) {
      if (!grouped[r.type]) {
        grouped[r.type] = {
          type: r.type,
          label: r.label,
          items: [],
        };
      }
      grouped[r.type].items.push(r.item);
    }

    const results = Object.values(grouped).map((g) => ({
      type: g.type,
      label: g.label,
      total: g.items.length,
      items: g.items.sort((a, b) => b.score - a.score).slice(0, limit),
    }));

    const response = {
      meta: {
        query: normalizedQuery,
        total: flatResults.length,
      },
      results,
    };

    if (CACHE.size >= MAX_CACHE_ENTRIES) {
      const firstKey = CACHE.keys().next().value;
      CACHE.delete(firstKey);
    }

    CACHE.set(cacheKey, { results: response, expiresAt: now + CACHE_TTL });

    return response;
  },
});
