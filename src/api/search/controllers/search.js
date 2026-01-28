// controllers/search.js

'use strict';

module.exports = {
  async search(ctx) {
    try {
      const { q, locale = 'it', limit = 20 } = ctx.query;

      if (!q) {
        ctx.body = [];
        return;
      }

      const results = await strapi
        .service('api::search.search')
        .search(q, locale, Number(limit));

      ctx.body = results;
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        error: 'Errore durante la ricerca',
        details: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  },
};
