'use strict';

/**
 * ai-assistant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ai-assistant.ai-assistant');
