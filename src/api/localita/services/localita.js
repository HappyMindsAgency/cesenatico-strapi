'use strict';

/**
 * localita service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::localita.localita');
