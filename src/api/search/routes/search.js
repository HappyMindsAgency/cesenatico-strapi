// routes/search.js

'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/search',
      handler: 'search.search',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
