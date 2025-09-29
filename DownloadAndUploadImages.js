/**
 * Di base si parte da questa repo https://github.com/rwit-io/wordpress-to-strapi
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const dotenv = require('dotenv');
dotenv.config();

const WP_NOME_ENTITA = process.env.WP_NOME_ENTITA;
const STRAPI_NOME_ENTITA = process.env.STRAPI_NOME_ENTITA;
const STRAPI_UPLOAD_URL = process.env.STRAPI_UPLOAD_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const WORDPRESS_API = process.env.WORDPRESS_API+WP_NOME_ENTITA+'?_embed';
const TEMP_MEDIA_DIR = path.join(__dirname, "temp_media");
const IMAGE_MAPPING_FILE = path.join(__dirname, "image_mappings.json");
const STRAPI_INDEX_FILE = path.join(__dirname, "strapiIndex.json");

// Validate required environment variables early
function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
}

function validateEnvOrExit() {
  const missing = [];
  if (!STRAPI_UPLOAD_URL) missing.push("STRAPI_UPLOAD_URL");
  if (!STRAPI_TOKEN) missing.push("STRAPI_TOKEN");
  if (!WORDPRESS_API) missing.push("WORDPRESS_API");

  const invalid = [];
  if (STRAPI_UPLOAD_URL && !isValidUrl(STRAPI_UPLOAD_URL)) invalid.push("STRAPI_UPLOAD_URL");
  if (WORDPRESS_API && !isValidUrl(WORDPRESS_API)) invalid.push("WORDPRESS_API");

  if (missing.length || invalid.length) {
    console.error("❌ Configuration error:");
    if (missing.length) {
      console.error(`   Missing env vars: ${missing.join(", ")}`);
    }
    if (invalid.length) {
      console.error(`   Invalid URL format: ${invalid.join(", ")}`);
    }
    console.error("\nCreate a .env file (or set your environment) with values like:");
    console.error("STRAPI_UPLOAD_URL=http://localhost:1337/api/upload");
    console.error("STRAPI_TOKEN=YOUR_STRAPI_API_TOKEN");
    console.error("WORDPRESS_API=https://example.com/wp-json/wp/v2/posts?_embed");
    process.exit(1);
  }
}

validateEnvOrExit();

const DELAY_MS = 5000; 
const MAX_RETRIES = 3; 

let imageMappings = {};
if (fs.existsSync(IMAGE_MAPPING_FILE)) {
  imageMappings = JSON.parse(fs.readFileSync(IMAGE_MAPPING_FILE, "utf8"));
}

// Ensure temp_media directory exists
if (!fs.existsSync(TEMP_MEDIA_DIR)) {
  fs.mkdirSync(TEMP_MEDIA_DIR, { recursive: true });
}

// Download image from Wordpress Api
async function downloadImage(imageUrl, filename) {
  try {
    console.log(`📥 Downloading image: ${imageUrl}...`);
    const imagePath = path.join(TEMP_MEDIA_DIR, filename);

    const response = await axios({
      url: imageUrl,
      responseType: "stream",
    });

    await new Promise((resolve, reject) => {
      const stream = response.data.pipe(fs.createWriteStream(imagePath));
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    console.log(`✅ Image saved: ${imagePath}`);
    return imagePath;
  } catch (error) {
    console.error(`❌ Error downloading image: ${imageUrl}`, error.message);
    return null;
  }
}

// Upload image to Strapi
async function uploadImage(filePath, attempt = 1) {
  const fileName = path.basename(filePath);

  if (imageMappings[fileName]) {
    console.log(`✅ Image already uploaded: ${fileName}`);
    return imageMappings[fileName];
  }

  try {
    console.log(`📤 Uploading: ${filePath} (Attempt ${attempt})`);
    
    const formData = new FormData();
    formData.append("files", fs.createReadStream(filePath));

    const response = await axios.post(STRAPI_UPLOAD_URL, formData, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        ...formData.getHeaders(),
      },
    });

    const uploadedImage = response.data[0];
    console.log(`✅ Uploaded: ${uploadedImage.url}`);

    // Save image mapping
    imageMappings[fileName] = uploadedImage.id;
    fs.writeFileSync(IMAGE_MAPPING_FILE, JSON.stringify(imageMappings, null, 2));

    return uploadedImage.id;
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}: ${error.message}`);

    if (attempt < MAX_RETRIES) {
      console.log(`🔄 Retrying ${fileName} (Attempt ${attempt + 1}) in ${DELAY_MS}ms...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      return uploadImage(filePath, attempt + 1);
    } else {
      console.error(`❌ Skipping ${fileName} after ${MAX_RETRIES} failed attempts.`);
      return null;
    }
  }
}

// Helpers to build WP endpoints and fetch with pagination
function getWpV2Base(urlString) {
  const u = new URL(urlString);
  const idx = u.pathname.indexOf('/wp-json/wp/v2');
  if (idx === -1) return `${u.origin}/wp-json/wp/v2`;
  return `${u.origin}${u.pathname.slice(0, idx + '/wp-json/wp/v2'.length)}`;
}

async function fetchAllPaginated(baseUrl, resource, extraParams = {}) {
  const perPage = 100;
  let page = 1;
  const results = [];
  while (true) {
    const url = `${baseUrl}/${resource}`;
    try {
      const response = await axios.get(url, {
        params: { per_page: perPage, page, ...extraParams },
      });
      const items = response.data || [];
      results.push(...items);
      const totalPages = parseInt(response.headers['x-wp-totalpages'] || '0', 10);
      if (!items.length || (totalPages && page >= totalPages)) break;
      page += 1;
    } catch (error) {
      if (error.response && error.response.status === 400) break;
      console.error(`❌ Error fetching ${resource} page ${page}:`, error.message);
      break;
    }
  }
  return results;
}

async function fetchAllWordPressPosts() {
  console.log("📡 Fetching ALL posts (paginated)...");
  const base = getWpV2Base(WORDPRESS_API);
  const posts = await fetchAllPaginated(base, WP_NOME_ENTITA, { _embed: true });
  console.log(`✅ Total posts fetched: ${posts.length}`);
  return posts;
}

async function fetchAllWordPressMedia() {
  console.log("📡 Fetching ALL media (paginated)...");
  const base = getWpV2Base(WORDPRESS_API);
  const media = await fetchAllPaginated(base, 'media');
  console.log(`✅ Total media fetched: ${media.length}`);
  return media;
}

// -------- Strapi media helpers to avoid duplicates --------
function getStrapiFilesEndpoint() {
  const base = STRAPI_UPLOAD_URL.replace(/\/$/, "");
  console.log(`🔍 Strapi files endpoint: ${base}/files`);
  return `${base}/files`;
}

function normalizeBaseName(filename) {
  const name = String(filename || '').toLowerCase();
  const base = name.replace(/\.[a-z0-9]+$/i, '');
  return base.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function stripHashSuffix(normalizedBase) {
  // Remove trailing _<hash> that Strapi may add (6+ hex chars)
  return normalizedBase.replace(/_[a-f0-9]{6,}$/i, '');
}

async function fetchAllStrapiFiles() {
  const filesEndpoint = getStrapiFilesEndpoint();
  try {
    // First request – many Strapi setups (v5 upload) return ALL files as an array, ignoring pagination
    const first = await axios.get(filesEndpoint, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: { 'pagination[page]': 1, 'pagination[pageSize]': 100 },
    });
    const body = first.data;
    if (Array.isArray(body)) {
      console.log(`✅ Strapi returned array with ${body.length} files (no pagination)`);
      return body;
    }

    // If response is object with data/meta, paginate properly
    if (body && Array.isArray(body.data)) {
      const results = [...body.data];
      const totalPages = (body.meta && body.meta.pagination && body.meta.pagination.pageCount) || 1;
      for (let p = 2; p <= totalPages; p++) {
        const pageResp = await axios.get(filesEndpoint, {
          headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
          params: { 'pagination[page]': p, 'pagination[pageSize]': 100 },
        });
        const items = (pageResp.data && pageResp.data.data) || [];
        results.push(...items);
      }
      console.log(`✅ Total Strapi files fetched: ${results.length}`);
      return results;
    }

    // Unknown shape
    console.warn('⚠️ Unexpected Strapi files response shape. Returning empty list.');
    return [];
  } catch (error) {
    console.error(`❌ Error fetching Strapi files:`, error.message);
    return [];
  }
}

async function buildStrapiIndex() {
  // If the on-disk index already exists, reuse it
  if (fs.existsSync(STRAPI_INDEX_FILE)) {
    try {
      const existing = JSON.parse(fs.readFileSync(STRAPI_INDEX_FILE, "utf8"));
      console.log("🗂️ Using existing Strapi index: strapiIndex.json");
      return existing; // shape: { storedName: id }
    } catch (_) {
      // fallthrough to rebuild
    }
  }

  console.log("🗂️ Building Strapi index and saving to strapiIndex.json...");
  const files = await fetchAllStrapiFiles();
  const indexObject = {};
  for (const f of files) {
    // Strapi v5 upload returns objects with id, name (array returns raw file objects)
    const name = (f && f.name) || (f && f.attributes && f.attributes.name) || (f && f.url && path.basename(f.url)) || '';
    const id = (f && f.id) || (f && f.documentId) || (f && f.attributes && f.attributes.id);
    if (!name || !id) continue;
    if (indexObject[name] === undefined) indexObject[name] = id;
  }
  fs.writeFileSync(STRAPI_INDEX_FILE, JSON.stringify(indexObject, null, 2));
  console.log(`✅ Saved ${Object.keys(indexObject).length} entries to strapiIndex.json`);
  return indexObject; // shape: { storedName: id }
}

async function findExistingInStrapiByBase(normalizedBase) {
  const filesEndpoint = getStrapiFilesEndpoint();
  try {
    const response = await axios.get(filesEndpoint, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: { 'filters[name][$containsi]': normalizedBase, 'pagination[pageSize]': 1 },
    });
    const arr = Array.isArray(response.data) ? response.data : [];
    return arr.length ? arr[0].id : null;
  } catch (error) {
    return null;
  }
}

// Process images from WordPress posts and media library
async function processImages() {
  const posts = await fetchAllWordPressPosts();
  const strapiIndexObject = await buildStrapiIndex();
  // Build normalized lookup (strip Strapi hash suffix) for quick matching
  const normalizedIndex = new Map(); // key: normalized stripped name, val: id
  for (const [storedName, storedId] of Object.entries(strapiIndexObject)) {
    const key = stripHashSuffix(normalizeBaseName(storedName));
    if (!normalizedIndex.has(key)) normalizedIndex.set(key, storedId);
  }

  for (const post of posts) {
    const embeddedImageUrl = post && post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0] && post._embedded["wp:featuredmedia"][0].source_url;
    const explicitImageUrl = post && post.featured_image;
    const imageUrl = explicitImageUrl || embeddedImageUrl;
    if (imageUrl) {
      const cleanUrl = imageUrl.split('?')[0];
      const fileName = path.basename(cleanUrl);

      // Skip early if already uploaded (based on mapping)
      if (imageMappings[fileName]) {
        console.log(`✅ Already uploaded (skip): ${fileName}`);
        continue;
      }

      // Skip if present in Strapi by normalized base name (using on-disk index)
      const key = stripHashSuffix(normalizeBaseName(fileName));
      const existingId = normalizedIndex.get(key);
      if (existingId) {
        console.log(`✅ Found on Strapi (skip upload): ${fileName} -> ${existingId}`);
        imageMappings[fileName] = existingId;
        fs.writeFileSync(IMAGE_MAPPING_FILE, JSON.stringify(imageMappings, null, 2));
        continue;
      }

      const imagePath = await downloadImage(imageUrl, fileName);
      if (imagePath) {
        const uploadedId = await uploadImage(imagePath);
        if (uploadedId) {
          if (!normalizedIndex.has(key)) normalizedIndex.set(key, uploadedId);
        }
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    }
  }

  // Also process the entire WordPress media library
  const mediaItems = await fetchAllWordPressMedia();
  for (const item of mediaItems) {
    if (!item || !item.source_url) continue;
    const cleanUrl = item.source_url.split('?')[0];
    const fileName = path.basename(cleanUrl);
    if (imageMappings[fileName]) {
      console.log(`✅ Already uploaded (skip): ${fileName}`);
      continue; // already uploaded
    }

    // Skip if present in Strapi by normalized base name (using on-disk index)
    const key = stripHashSuffix(normalizeBaseName(fileName));
    const existingId = normalizedIndex.get(key);
    if (existingId) {
      console.log(`✅ Found on Strapi (skip upload): ${fileName} -> ${existingId}`);
      imageMappings[fileName] = existingId;
      fs.writeFileSync(IMAGE_MAPPING_FILE, JSON.stringify(imageMappings, null, 2));
      continue;
    }
    const imagePath = await downloadImage(item.source_url, fileName);
    if (imagePath) {
      const uploadedId = await uploadImage(imagePath);
      if (uploadedId) {
        if (!normalizedIndex.has(key)) normalizedIndex.set(key, uploadedId);
      }
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }

  console.log("🎉 Image processing completed!");
}

processImages();
