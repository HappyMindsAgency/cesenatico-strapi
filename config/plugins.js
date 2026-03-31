module.exports = () => ({
    'hm-ai-strapi-translate': {
        enabled: true,
        config: {
          blacklist: {
            "strutture": {
              "kind": "collectionType",
              "fields": ["titolo"]
            }
          }
        }
    }
});
