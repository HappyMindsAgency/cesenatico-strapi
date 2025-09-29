/**
 * Di base si parte da questa repo https://github.com/rwit-io/wordpress-to-strapi
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { format } = require("date-fns");
const dotenv = require('dotenv');
dotenv.config();

// Function to decode HTML entities
function decodeHtmlEntities(text) {
  if (!text) return text;
  
  const entityMap = {
    '&#8220;': '"', // Left double quotation mark
    '&#8221;': '"', // Right double quotation mark
    '&#8216;': `'`, // Left single quotation mark
    '&#8217;': `'`, // Right single quotation mark
    '&#8218;': '‚', // Single low-9 quotation mark
    '&#8222;': '„', // Double low-9 quotation mark
    '&#8211;': '–', // En dash
    '&#8212;': '—', // Em dash
    '&#8230;': '…', // Horizontal ellipsis
    '&#8242;': '′', // Prime
    '&#8243;': '″', // Double prime
    '&#8364;': '€', // Euro sign
    '&#8482;': '™', // Trade mark sign
    '&#169;': '©',  // Copyright sign
    '&#174;': '®',  // Registered sign
    '&#160;': ' ',  // Non-breaking space
    '&amp;': '&',   // Ampersand
    '&lt;': '<',    // Less than
    '&gt;': '>',    // Greater than
    '&quot;': '"',  // Quotation mark
    '&apos;': "'",  // Apostrophe
    '&nbsp;': ' ',  // Non-breaking space
  };
  
  let decodedText = text;
  for (const [entity, char] of Object.entries(entityMap)) {
    decodedText = decodedText.replace(new RegExp(entity, 'g'), char);
  }
  
  return decodedText;
}

// Function to format meta description to be between 50-160 characters
function formatMetaDescription(text) {
  if (!text) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.";
  
  // Remove HTML tags and decode entities
  let cleanText = text.replace(/<[^>]*>/g, '').trim();
  cleanText = decodeHtmlEntities(cleanText);
  
  // If text is too short (less than 50 chars), pad it with spaces
  if (cleanText.length < 50) {
    const spacesNeeded = 50 - cleanText.length;
    cleanText = cleanText + " ".repeat(spacesNeeded);
  }
  
  // If text is too long (more than 160 chars), truncate it
  if (cleanText.length > 160) {
    cleanText = cleanText.substring(0, 157) + "...";
  }
  
  return cleanText;
}

// Function to format meta title to be maximum 60 characters
function formatMetaTitle(text) {
  if (!text) return null;
  
  // Remove HTML tags and decode entities
  let cleanText = text.replace(/<[^>]*>/g, '').trim();
  cleanText = decodeHtmlEntities(cleanText);
  
  // Remove " - Visit Cesenatico" if present
  cleanText = cleanText.replace(/ - Visit Cesenatico$/, '');
  
  // Remove " | Visit Cesenatico" if present
  cleanText = cleanText.replace(" | Visit Cesenatico", '');
  
  // If text is too long (more than 60 chars), truncate it
  if (cleanText.length > 60) {
    cleanText = cleanText.substring(0, 57) + "...";
  }
  
  return cleanText;
}

// Function to format meta title to be maximum 60 characters
function formatMetaSocialDescription(text) {
  if (!text) return null;
  
  // Remove HTML tags and decode entities
  let cleanText = text.replace(/<[^>]*>/g, '').trim();
  cleanText = decodeHtmlEntities(cleanText);
  
  // If text is too long (more than 60 chars), truncate it
  if (cleanText.length > 65) {
    cleanText = cleanText.substring(0, 62) + "...";
  }
  
  return cleanText;
}

const WP_NOME_ENTITA = process.env.WP_NOME_ENTITA;
const STRAPI_NOME_ENTITA = process.env.STRAPI_NOME_ENTITA;
const STRAPI_URL = process.env.STRAPI_URL+STRAPI_NOME_ENTITA;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const WORDPRESS_API = process.env.WORDPRESS_API+WP_NOME_ENTITA+'?order=asc';
const IMAGE_MAPPING_FILE = path.join(__dirname, "image_mappings.json");
const TEST_MODE = process.env.TEST_MODE === 'true';

// Configuration for different entity types
const ENTITY_CONFIGS = {
  'eventi': {
    // Variable fields specific to this entity
    variableFields: {
      linkUrl: (post) => (post && post.meta && post.meta.mec_read_more && (post.meta.mec_read_more)) || "",
      dataInizio: (post) => (post && post.meta && post.meta.mec_start_date && (post.meta.mec_start_date)) || "",
      dataFine: (post) => (post && post.meta && post.meta.mec_end_date && (post.meta.mec_end_date)) || "",
      descrizione: (post) => (post && post.content && (post.content.rendered || post.content)) || "",
      anteprima: (post) => (post && post.excerpt && (post.excerpt.rendered || post.excerpt)) || "",
    }
  },
    'articoli': {
      // Variable fields specific to this entity
      variableFields: {
        content: (post) => (post && post.content && (post.content.rendered || post.content)) || "",
        categoria_esplora: (post) => mapCategoriesToStrapi(post.categoria_experience),
      }
    },
  'pois': {
    // Variable fields specific to this entity
    variableFields: {
      indirizzo: (post) => (post && post.meta && post.meta.indirizzo_pointof && (post.meta.indirizzo_pointof)) || "",
      googleMapsLink: (post) => (post && post.meta && post.meta.indirizzo_pointof && (getMapsLink(post.meta.indirizzo_pointof))) || "",
      descrizione: (post) => (post && post.content && (post.content.rendered || post.content)) || "",
       contatti: (post) => {
         const contacts = [];
         
         if (post && post.meta && post.meta.tel_pointof) {
           contacts.push(`Telefono: ${post.meta.tel_pointof}`);
         }
         if (post && post.meta && post.meta.fax_pointof) {
           contacts.push(`Fax: ${post.meta.fax_pointof}`);
         }
         if (post && post.meta && post.meta.email_pointof) {
           contacts.push(`Email: ${post.meta.email_pointof}`);
         }
         if (post && post.meta && post.meta.facebook_pointof) {
           contacts.push(`Facebook: ${post.meta.facebook_pointof}`);
         }
         if (post && post.meta && post.meta.instagram_pointof) {
           contacts.push(`Instagram: ${post.meta.instagram_pointof}`);
         }
         if (post && post.meta && post.meta.sito) {
           contacts.push(`Sito: ${post.meta.sito}`);
         }
         
         return contacts.join('\n');
       },
      categoria_esplora: (post) => mapCategoriesToStrapi(post.categoria_poi),
    }
  },
  'strutture': {
    // Variable fields specific to this entity
    variableFields: {
      // se è un POI che diventa STRUTTURA
      descrizione: (post) => (post && post.content && (post.content.rendered || post.content)) || "",
      //indirizzo: (post) => (post && post.meta && post.meta.indirizzo_pointof && (post.meta.indirizzo_pointof)) || "-",
      //localita: (post) => "Cesenatico (FC)",
      //telefono: (post) => (post && post.meta && post.meta.tel_pointof && (post.meta.tel_pointof)) || "-",
      //email: (post) => (post && post.meta && post.meta.email_pointof && (post.meta.email_pointof)) || "example@visitcesenatico.it",
      //sitoWeb: (post) => (post && post.meta && post.meta.sito && (post.meta.sito)) || "",
      //facebook: (post) => (post && post.meta && post.meta.facebook_pointof && (post.meta.facebook_pointof)) || "",
      //instagram: (post) => (post && post.meta && post.meta.instagram_pointof && (post.meta.instagram_pointof)) || "",

      //categoria_struttura: (post) => mapStructureCategoriesToStrapi(post.categoria_poi)?.categoria_struttura || null,
      //tipologia_struttura: (post) => mapStructureCategoriesToStrapi(post.categoria_poi)?.tipologia_struttura || null,

      // se è una STRUTTURA che diventa STRUTTURA
      indirizzo: (post) => (post && post.meta && post.meta.indirizzo_strutture && (post.meta.indirizzo_strutture)) || "-",
      telefono: (post) => (post && post.meta && post.meta.tel_pointof && (post.meta.tel_pointof)) || "-",

      email: (post) => (post && post.meta && post.meta.email_strutture && (post.meta.email_strutture)) || "example@visitcesenatico.it",
      sitoWeb: (post) => (post && post.meta && post.meta.sito_strutture && (post.meta.sito_strutture)) || "",
      facebook: (post) => (post && post.meta && post.meta.facebook_strutture && (post.meta.facebook_strutture)) || "",
      instagram: (post) => (post && post.meta && post.meta.instagram_strutture && (post.meta.instagram_strutture)) || "",
      cinCode: (post) => (post && post.meta && post.meta.cin_pointof && (post.meta.cin_pointof)) || "-",

      localita: (post) => (post && post.meta && post.meta.localita_strutture && (post.meta.localita_strutture)) || mapLocalitaToStrapi(post.vc_localita) || "Cesenatico (FC)",
      classificazione_struttura: (post) => mapStelleToStrapi(post.hmvc_stelle_strutture) || null,
      categoria_struttura: (post) => mapStructureCategoriesToStrapi(post.categoria_strutture, post)?.categoria_struttura || null,
      tipologia_struttura: (post) => mapStructureCategoriesToStrapi(post.categoria_strutture, post)?.tipologia_struttura || null,
      //listaServizi: (post) => mapStructureCategoriesToStrapi(post.categoria_strutture, post)?.listaServizi || null,
    }
  },
  // Add more entity configurations as needed
};

// Category mapping for hmvc_experience to articoli
const EXP_CATEGORY_MAPPING = {
  "88": ['tyyl5e7ylufs7yl1z5kz7v42'],
  "80": ['xsxp6tsfeiw4f89n5bztth5o', 'auqzv8stgelouq7siyfm19ja'],
  "82": ['jgu17o9hn5bd2bouqwtr13jl'],
  "86": ['keoj888w3qn7vvebb7ukqqjn'],
  "1395": ['lvcl9t00cfdx4k2cgxtffx3s', 'tyyl5e7ylufs7yl1z5kz7v42'],
  "84": ['auqzv8stgelouq7siyfm19ja'],
  "1402": ['xsxp6tsfeiw4f89n5bztth5o', 'auqzv8stgelouq7siyfm19ja'],
  "90": ['xsxp6tsfeiw4f89n5bztth5o', 'auqzv8stgelouq7siyfm19ja'],
  "1470": ['xsxp6tsfeiw4f89n5bztth5o']
};

const POI_CATEGORY_MAPPING = {
  "169": ['tyyl5e7ylufs7yl1z5kz7v42'],
  "165": ['tyyl5e7ylufs7yl1z5kz7v42'],
  "174": ['tyyl5e7ylufs7yl1z5kz7v42'],
  "179": ['keoj888w3qn7vvebb7ukqqjn'],
  "113": ['auqzv8stgelouq7siyfm19ja'],
  "118": ['auqzv8stgelouq7siyfm19ja'],
  "202": ['xsxp6tsfeiw4f89n5bztth5o'],
  "200": ['auqzv8stgelouq7siyfm19ja'],
  "197": ['xsxp6tsfeiw4f89n5bztth5o'],
  "194": ['xsxp6tsfeiw4f89n5bztth5o']
};

const STRUTTURE_STELLE_MAPPING = {
  "671": "r3nxx1tytuqgxcunss3ojnn8",
  "673": "ylxo5hrhlkcshpm3923r9yyz",
  "675": "d990mrad4epvgev8mlsxe1wy",
  "677": "q7qz0cj9row6yostinfm4qzh",
  "679": "as4p93pe3td4n046x4e179aj",
  "681": "penfh3o8ezzn19fizwi9hkcr"
}

const STRUTTURE_LOCALITA_MAPPING = {
  "1449": "Bagnarola",
  "1246": "Borella",
  "1250": "Cannucceto",
  "1254": "Centro",
  "1517": "Madonnina - Santa Teresa",
  "1267": "Ponente",
  "1271": "Sala",
  "1258": "Valverde",
  "1263": "Villamarina",
  "1275": "Zadina",
  "1279": "Zadina pineta"
}

const STRUTTURE_TIPOLOGIA_MAPPING = {
  "1294": "r9nad2mfcmhiutwffp2p1iqa",
  "629": "bspqrquxc0674x3azu6hen9r",
  "1285": "hmuje2iajvkvktxt2v4unjs5",
  "631": "vgo30tmpkwevqk3nmvz5al30",
  "615": "i2iy2srfveqhf1mq7tlvvpac",
  "621": "qm7clrzvphlsxq0cdksq2svd",
  "1290": "i7vx68zlcu6wdy1h8fqpgxl9",
  "623": "lm9ejcce32pjlryirxh276gp"
}

const STRUCTURE_CATEGORY_MAPPING = {
  "707": { // fast food e street food
    //"categoria_cosa_fare": "bdxhv4p83p7e09xc93qim03t",
    "categoria_struttura": "oo4tjra4fswaws8ubcm3s77l", // attività di ristorazione
    "tipologia_struttura": "ivd9mrxpgm38uhkcnmnzb9db", // chiosco
  },
  "706": { // ristoranti
    //"categoria_cosa_fare": "bdxhv4p83p7e09xc93qim03t",
    "categoria_struttura": "mlianf6ct7cila1tvj0freiv", // attività di ristorazione
    "tipologia_struttura": "ska8p0101o74rx0tmuahwjj6", // ristorante
  },
  "708": { // wine
    //"categoria_cosa_fare": "bdxhv4p83p7e09xc93qim03t",
    "categoria_struttura": "mlianf6ct7cila1tvj0freiv", // attività di ristorazione
    "tipologia_struttura": "js0io12jg5r80kfnz0sxp1fj", // altro
  },
  "240": { // agenzie
    //"categoria_cosa_fare": "a84gy9uqw9dvq8jdb9ztzgq6",
    "tipologia_struttura": "yar0mkhaxurq22gpx48xkm7u" // agenzie
  },
  "242": { // cesenatico4pets
    //"categoria_cosa_fare": "a84gy9uqw9dvq8jdb9ztzgq6",
    "tipologia_struttura": "lymbhjrb4b319bp6nzpnh63a" // cesenatico4pets
  },
  "232": { // fiere e congressi
    //"categoria_cosa_fare": "a84gy9uqw9dvq8jdb9ztzgq6",
    "tipologia_struttura": "ipg9bny38674w2sp9flbhldf" // 
  },
  "236": { // servizi turistici
    //"categoria_cosa_fare": "a84gy9uqw9dvq8jdb9ztzgq6",
    "tipologia_struttura": "ojrrq9q3hdn0n5w59kbgxg06" // servizi turistici
  },
  "244": { // tempo libero
    //"categoria_cosa_fare": "a84gy9uqw9dvq8jdb9ztzgq6",
    "tipologia_struttura": "ooucfpyn3mtllqzvynx33e41" // tempo libero
  },
  "230": { // uffici informazioni
    //"categoria_cosa_fare": "a84gy9uqw9dvq8jdb9ztzgq6",
    "tipologia_struttura": "l7jt2qma7gkdjac65rjvcvbo" // uffici informazioni
  },
  "189": { // stabilimenti balneari
    //"categoria_cosa_fare": "jlz0l9xcgugskdjf6gt7gj3j",
    "categoria_struttura": "oo4tjra4fswaws8ubcm3s77l", // balneare
    "tipologia_struttura": "bwjyqji9pjy78j7r54ragjig", // stabilimento balneare
  },

  // QUI COMINCIANO GLI ID DELLE VERE STRUTTURE DI WP CESENATICO
  "1294": { // affittacamere
    //"categoria_cosa_fare": "",
    "tipologia_struttura": "r9nad2mfcmhiutwffp2p1iqa", // affittacamere
    "categoria_struttura": "vihtd0jzqbeedcpbm3qnb9sw", // appartamenti
  },
  "629": { // agriturismi
    //"categoria_cosa_fare": "",
    "tipologia_struttura": "bspqrquxc0674x3azu6hen9r", // agriturismi
    "categoria_struttura": "fb7cdc5rp4h1cetjjqnvike7", // ricettivo
  },
  "1285": { // b&b
    //"categoria_cosa_fare": "",
    "tipologia_struttura": "hmuje2iajvkvktxt2v4unjs5", // b&b
    "categoria_struttura": "fb7cdc5rp4h1cetjjqnvike7", // ricettivo
  },
  "631": { // campeggi ecc
    //"categoria_cosa_fare": "",
    "tipologia_struttura": "vgo30tmpkwevqk3nmvz5al30", // campeggi, villaggi turistici, aree sosta camper
    "categoria_struttura": "fb7cdc5rp4h1cetjjqnvike7", // ricettivo
  },
  "615": { // appartamenti
    //"categoria_cosa_fare": "",
    "tipologia_struttura": "i2iy2srfveqhf1mq7tlvvpac", // appartamenti
    "categoria_struttura": "vihtd0jzqbeedcpbm3qnb9sw", // appartamenti
  },
  "621": { // hotel
    //"categoria_cosa_fare": "",
    "tipologia_struttura": "qm7clrzvphlsxq0cdksq2svd", // hotel
    "categoria_struttura": "fb7cdc5rp4h1cetjjqnvike7", // ricettivo
  },
  "1290": { // ostelli
    //"categoria_cosa_fare": "",
    "tipologia_struttura": "i7vx68zlcu6wdy1h8fqpgxl9", // ostelli
    "categoria_struttura": "fb7cdc5rp4h1cetjjqnvike7", // ricettivo
  },
  "623": { // residence
    //"categoria_cosa_fare": "",
    "tipologia_struttura": "lm9ejcce32pjlryirxh276gp", // residence
    "categoria_struttura": "fb7cdc5rp4h1cetjjqnvike7", // ricettivo
  }
};

// Function to map WordPress categories to Strapi categories
function mapCategoriesToStrapi(categoriaExperience) {
  if (!categoriaExperience || !Array.isArray(categoriaExperience)) {
    return null;
  }
  
  const mappedArticlesCategories = [];
  
  categoriaExperience.forEach(catId => {
    const strapiArticlesCategories = STRAPI_NOME_ENTITA == 'articoli' ? EXP_CATEGORY_MAPPING[catId.toString()] : POI_CATEGORY_MAPPING[catId.toString()];
    if (strapiArticlesCategories) {
      strapiArticlesCategories.forEach(strapiId => {
        mappedArticlesCategories.push(strapiId);
      });
    }
  });
  
  return mappedArticlesCategories.length > 0 ? { connect: mappedArticlesCategories } : null;
}

// Function to map WordPress categories to Strapi categories
function mapStelleToStrapi(stelleWP) {
  if (!stelleWP || !Array.isArray(stelleWP)) {
    return null;
  }
  
  const mappedStelleCategories = [];
  
  stelleWP.forEach(catId => {
    const strapiStelleCategories = STRUTTURE_STELLE_MAPPING[catId.toString()];
    if (strapiStelleCategories) {
      strapiStelleCategories.forEach(strapiId => {
        mappedStelleCategories.push(strapiId);
      });
    }
  });
  
  return mappedStelleCategories.length > 0 ? { connect: mappedStelleCategories } : null;
}

// Function to map WordPress categories to Strapi categories
function mapLocalitaToStrapi(localitaWP) {
  if (!localitaWP || !Array.isArray(localitaWP)) {
    return null;
  }
  
  const mappedLocalitaCategories = [];
  
  localitaWP.forEach(catId => {
    const strapiLocalitaCategories = STRUTTURE_LOCALITA_MAPPING[catId.toString()];
    if (strapiLocalitaCategories) {
      strapiLocalitaCategories.forEach(strapiId => {
        mappedLocalitaCategories.push(strapiId);
      });
    }
  });
  
  return mappedLocalitaCategories.length > 0 ? mappedLocalitaCategories : null;
}

// Function to map WordPress categories to Strapi categories
function mapTipologiaStrutturaToStrapi(tipologiaWP) {
  if (!tipologiaWP || !Array.isArray(tipologiaWP)) {
    return null;
  }
  
  const mappedTipologiaStruttura = [];
  
  tipologiaWP.forEach(catId => {
    const strapiTipologiaStruttura = STRUTTURE_TIPOLOGIA_MAPPING[catId.toString()];
    if (strapiTipologiaStruttura) {
      strapiTipologiaStruttura.forEach(strapiId => {
        mappedTipologiaStruttura.push(strapiId);
      });
    }
  });
  
  return mappedTipologiaStruttura.length > 0 ? { connect: mappedTipologiaStruttura } : null;
}

// Function to map WordPress categories to multiple Strapi category types
function mapStructureCategoriesToStrapi(categoriaPoi, post) {
  if (!categoriaPoi || !Array.isArray(categoriaPoi)) {
    return null;
  }
  
  const result = {};
  
  categoriaPoi.forEach(catId => {
    const structureMapping = STRUCTURE_CATEGORY_MAPPING[catId.toString()];
    if (structureMapping) {
      // Merge all category types for this ID
      Object.entries(structureMapping).forEach(([categoryType, strapiId]) => {
        if (!result[categoryType]) {
          result[categoryType] = [];
        }
        if (!result[categoryType].includes(strapiId)) {
          result[categoryType].push(strapiId);
        }
      });
    }
  });
  
  // Add servizi based on category type
  const serviziStrutture = post && post.hmvc_servizi_strutture ? post.hmvc_servizi_strutture : [];
  const accessibilita = post && post.hmvc_accessibilita ? post.hmvc_accessibilita : [];
  
  // Check if it's appartamenti (caso 1)
  if (categoriaPoi.some(id => [1294, 615].includes(id))) {
    result.listaServizi = {
      filtriAppartamenti: {
        main: {
          parcheggio: serviziStrutture.includes(647),
          petFriendly: serviziStrutture.includes(655),
          accessibile: accessibilita.includes(635),
          serviziFamily: serviziStrutture.includes(645)
        }
      }
    };
  }
  
  // Check if it's ricettivo (caso 2)
  if (categoriaPoi.some(id => [629, 1285, 631, 621, 1290, 623].includes(id))) {
    result.listaServizi = {
      filtriRicettivo: {
        main: {
          spa: serviziStrutture.includes(663),
          allInclusive: serviziStrutture.includes(669),
          cucinaGlutenFree: serviziStrutture.includes(653),
          cucinaVegetariana: serviziStrutture.includes(653),
          parcheggio: serviziStrutture.includes(647),
          petFriendly: serviziStrutture.includes(655),
          serviziBike: serviziStrutture.includes(639),
          serviziFamily: serviziStrutture.includes(645),
          strutturaAccessibile: accessibilita.includes(635)
        }
      }
    };
  }
  
  // Convert arrays to connect format
  const finalResult = {};
  Object.entries(result).forEach(([categoryType, strapiIds]) => {
    if (categoryType === 'listaServizi') {
      finalResult[categoryType] = strapiIds;
    } else {
      finalResult[categoryType] = { connect: strapiIds };
    }
  });
  
  return Object.keys(finalResult).length > 0 ? finalResult : null;
}

function getMapsLink(address) {
  // Codifica l'indirizzo per evitare problemi con spazi o caratteri speciali
  const encodedAddress = encodeURIComponent(address);

  // Costruisce il link a Google Maps
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return mapsUrl;
}

// Function to build post data based on entity configuration
function buildPostData(post, wpTitle, featuredImageId, seoFeaturedImageId, facebookImageId, twitterImageId, entityType) {
  const config = ENTITY_CONFIGS[entityType];
  if (!config) {
    throw new Error(`No configuration found for entity type: ${entityType}`);
  }

  const postData = {
    data: {}
  };

  // Add standard fields (always present for all entities)
  postData.data.titolo = wpTitle;
  postData.data.slug = post.slug;

  // Add variable fields (specific to this entity)
  Object.entries(config.variableFields).forEach(([fieldName, fieldFunction]) => {
    postData.data[fieldName] = fieldFunction(post);
  });

  // Add image fields if available
  if (featuredImageId) {
    postData.data.cover = { id: featuredImageId };
  } else {
    postData.data.cover = { id: 2510 };
  }

  // Add SEO fields if available
  postData.data.seo = {
    metaTitle: formatMetaTitle((post && post.yoast_head_json && post.yoast_head_json.title) || wpTitle || ""),
    metaDescription: formatMetaDescription((post && post.yoast_head_json && post.yoast_head_json.description) || (post && post.excerpt && (post.excerpt.rendered || post.excerpt)) || wpTitle || "VisitCesenatico"),
    keywords: (post && post.meta._yoast_wpseo_focuskw && post.meta._yoast_wpseo_focuskw) || wpTitle+" Cesenatico" || "",
    metaImage: (seoFeaturedImageId || featuredImageId ? { id: seoFeaturedImageId || featuredImageId } : {id: 2510}),
    metaRobots: (() => {
      if (post && post.yoast_head_json && post.yoast_head_json.robots) {
        const indexValue = post.yoast_head_json.robots.index === "index" ? "index" : "noindex";
        const followValue = post.yoast_head_json.robots.follow === "follow" ? "follow" : "nofollow";
        return `${indexValue}, ${followValue}`;
      }
      return "index, follow";
    })(),
    metaSocial: [
      {
        socialNetwork: "Facebook",
        title: formatMetaTitle((post && post.meta && post.meta["_yoast_wpseo_opengraph-title"]) || wpTitle || "VisitCesenatico"),
        description: formatMetaSocialDescription((post && post.meta && post.meta["_yoast_wpseo_opengraph-description"]) ||  "Scopri di più!"),
        image: (facebookImageId || seoFeaturedImageId || featuredImageId ? { id: facebookImageId || seoFeaturedImageId || featuredImageId } : { id: 2510 }),
      },
      {
        socialNetwork: "Twitter",
        title: formatMetaTitle((post && post.meta && post.meta["_yoast_wpseo_twitter-title"]) || wpTitle || "VisitCesenatico"),
        description: formatMetaSocialDescription((post && post.meta && post.meta["_yoast_wpseo_twitter-description"]) ||  "Scopri di più!"),
        image: (twitterImageId || seoFeaturedImageId || featuredImageId ? { id: twitterImageId || seoFeaturedImageId || featuredImageId } : { id: 2510 }),
      },
    ]
  };

  return postData;
}

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
  if (!STRAPI_URL) missing.push("STRAPI_URL");
  if (!STRAPI_TOKEN) missing.push("STRAPI_TOKEN");
  if (!WORDPRESS_API) missing.push("WORDPRESS_API");
  if (!STRAPI_NOME_ENTITA) missing.push("STRAPI_NOME_ENTITA");
  if (!WP_NOME_ENTITA) missing.push("WP_NOME_ENTITA");

  const invalid = [];
  if (STRAPI_URL && !isValidUrl(STRAPI_URL)) invalid.push("STRAPI_URL");
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
    console.error("STRAPI_URL=http://localhost:1337/api/");
    console.error("STRAPI_NOME_ENTITA=eventi");
    console.error("STRAPI_TOKEN=YOUR_STRAPI_API_TOKEN");
    console.error("WORDPRESS_API=https://example.com/wp-json/wp/v2/");
    console.error("WP_NOME_ENTITA=mec-events");
    process.exit(1);
  }
}

validateEnvOrExit();

let imageMappings = {};
if (fs.existsSync(IMAGE_MAPPING_FILE)) {
  imageMappings = JSON.parse(fs.readFileSync(IMAGE_MAPPING_FILE, "utf8"));
}

async function fetchWordPressPosts() {
  console.log("📡 Fetching ALL posts (paginated)...");
  const results = [];
  try {
    const baseUrl = (() => {
      const u = new URL(WORDPRESS_API);
      const idx = u.pathname.indexOf('/wp-json/wp/v2');
      if (idx === -1) return `${u.origin}/wp-json/wp/v2`;
      return `${u.origin}${u.pathname.slice(0, idx + '/wp-json/wp/v2'.length)}`;
    })();

    const perPage = 100;
    let page = 1;
    while (true) {
      const url = `${baseUrl}/${WP_NOME_ENTITA}?order=asc`;
      console.log(url);
      const response = await axios.get(url, { params: { per_page: perPage, page, _embed: true } });
      const items = response.data || [];
      results.push(...items);
      const totalPages = parseInt(response.headers['x-wp-totalpages'] || '0', 10);
      if (!items.length || (totalPages && page >= totalPages)) break;
      page += 1;
    }
    console.log(`✅ Found ${results.length} posts.`);
    return results;
  } catch (error) {
    console.error("❌ Error fetching WordPress posts:", error.message);
    process.exit(1);
  }
}

async function fetchWordPressPostsTest() {
  console.log("🧪 Fetching TEST posts (first 10 only)...");
  const results = [];
  try {
    const baseUrl = (() => {
      const u = new URL(WORDPRESS_API);
      const idx = u.pathname.indexOf('/wp-json/wp/v2');
      if (idx === -1) return `${u.origin}/wp-json/wp/v2`;
      return `${u.origin}${u.pathname.slice(0, idx + '/wp-json/wp/v2'.length)}`;
    })();

    const url = `${baseUrl}/${WP_NOME_ENTITA}?order=asc`;
    console.log(url);
    const response = await axios.get(url, { params: { per_page: 10, page: 1, _embed: true } });
    const items = response.data || [];
    results.push(...items);
    
    console.log(`✅ Found ${results.length} test posts.`);
    return results;
  } catch (error) {
    console.error("❌ Error fetching WordPress posts:", error.message);
    process.exit(1);
  }
}

async function savePostToStrapi(post) {
    try {

      // Check if the post link contains /en/ (English version) and skip if it does
      const postLink = post && post.link;

      if (postLink && postLink.includes('/en/')) {
        const wpTitle = decodeHtmlEntities((post && post.title && (post.title.rendered || post.title)) || "");
        console.log(`⏭️ Skipping English event: ${wpTitle} (link contains /en/)`);
        return;
      }
      if (postLink && postLink.includes('/fr/')) {
        const wpTitle = decodeHtmlEntities((post && post.title && (post.title.rendered || post.title)) || "");
        console.log(`⏭️ Skipping French event: ${wpTitle} (link contains /fr/)`);
        return;
      }
      if (postLink && postLink.includes('/de/')) {
        const wpTitle = decodeHtmlEntities((post && post.title && (post.title.rendered || post.title)) || "");
        console.log(`⏭️ Skipping German event: ${wpTitle} (link contains /de/)`);
        return;
      }
      if (postLink && postLink.includes('/es/')) {
        const wpTitle = decodeHtmlEntities((post && post.title && (post.title.rendered || post.title)) || "");
        console.log(`⏭️ Skipping Spanish event: ${wpTitle} (link contains /es/)`);
        return;
      }

      if (WP_NOME_ENTITA == 'posts') {
        // Check if the post category is in the allowed array
        const catArticolo = post && post.categories;
        const catArticoloAllowed = [843, 845];
        
        if (catArticolo && !catArticolo.some(r=> catArticoloAllowed.includes(r))) {
          const wpTitle = decodeHtmlEntities((post && post.title && (post.title.rendered || post.title)) || "");
          console.log(`⏭️ Skipping post: ${wpTitle} (category ID not in allowed list: ${catArticolo.join(', ')})`);
          return;
        }
      }

      if (WP_NOME_ENTITA == 'pointofinterests') {
        const catPoi = post && post.categoria_poi;

        // per i POI che sono POI
        //const catPoiAllowed = [169, 165, 174, 179, 113, 118, 202, 200, 197, 194];

        // per i POI che sono STRUTTURE
        const catPoiAllowed = [707, 706, 708, 240, 242, 232, 236, 244, 230, 189];
        
        if (catPoi && !catPoi.some(r=> catPoiAllowed.includes(r))) {
          const wpTitle = decodeHtmlEntities((post && post.title && (post.title.rendered || post.title)) || "");
          console.log(`⏭️ Skipping POI: ${wpTitle} (category ID not in allowed list: ${catPoi.join(', ')})`);
          return;
        }
      }

      const wpTitle = decodeHtmlEntities((post && post.title && (post.title.rendered || post.title)) || "");
      console.log(`📝 Saving post: ${wpTitle}...`);
  
      let featuredImageId = null;
      let seoFeaturedImageId = null;
      let facebookImageId = null;
      let twitterImageId = null;

      const embeddedImageUrl = post && post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0] && post._embedded["wp:featuredmedia"][0].source_url;
      const explicitImageUrl = post && post.featured_image;
      const imageUrl = explicitImageUrl || embeddedImageUrl || null;

      const seoEmbeddedImageUrl = post && post.yoast_head_json && post._embedded["og_image"] && post._embedded["og_image"][0] && post._embedded["og_image"][0].source_url;
      const seoImageUrl = seoEmbeddedImageUrl || embeddedImageUrl || null;

      const facebookEmbeddedImageUrl = post && post.yoast_head_json && post._embedded["og_image"] && post._embedded["og_image"][0] && post._embedded["og_image"][0].source_url;
      const facebookImageUrl = facebookEmbeddedImageUrl || embeddedImageUrl || null;

      const twitterEmbeddedImageUrl = post && post.yoast_head_json && post._embedded["twitter_image"] && post._embedded["twitter_image"][0] && post._embedded["twitter_image"][0].source_url;
      const twitterImageUrl = twitterEmbeddedImageUrl || embeddedImageUrl || null;

      if (imageUrl) {
        const cleanUrl = imageUrl.split('?')[0];
        const imageName = path.basename(cleanUrl);
        if (imageMappings[imageName]) {
          featuredImageId = imageMappings[imageName];
        } else {
          console.log(`ℹ️ Featured image not uploaded yet for: ${wpTitle} (${imageName})`);
        }
      }
      if (seoImageUrl) {
        const seoCleanUrl = seoImageUrl.split('?')[0];
        const seoImageName = path.basename(seoCleanUrl);
        if (imageMappings[seoImageName]) {
          seoFeaturedImageId = imageMappings[seoImageName];
        } else {
          console.log(`ℹ️ SEO featured image not uploaded yet for: ${wpTitle} (${seoImageName})`);
        }
      }
      if (facebookImageUrl) {
        const facebookCleanUrl = facebookImageUrl.split('?')[0];
        const facebookImageName = path.basename(facebookCleanUrl);
        if (imageMappings[facebookImageName]) {
          facebookImageId = imageMappings[facebookImageName];
        } else {
          console.log(`ℹ️ Facebook featured image not uploaded yet for: ${wpTitle} (${facebookImageName})`);
        }
      }
      if (twitterImageUrl) {
        const twitterCleanUrl = twitterImageUrl.split('?')[0];
        const twitterImageName = path.basename(twitterCleanUrl);
        if (imageMappings[twitterImageName]) {
          twitterImageId = imageMappings[twitterImageName];
        } else {
          console.log(`ℹ️ Twitter featured image not uploaded yet for: ${wpTitle} (${twitterImageName})`);
        }
      }
  
      const formattedDate = format(new Date(post.date), "yyyy-MM-dd");
  
      // Build post data using entity configuration
      const postData = buildPostData(post, wpTitle, featuredImageId, seoFeaturedImageId, facebookImageId, twitterImageId, STRAPI_NOME_ENTITA);
  
      try {
        const createResponse = await axios.post(STRAPI_URL, postData, {
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        console.log(`✅ Post saved: ${createResponse.data.data.id}`);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message === "This attribute must be unique"
        ) {
          console.log(`⚠️ Post with slug "${post.slug}" already exists, skipping.`);
        } else {
          console.error("❌ Error saving post:", error.response ? error.response.data : error.message);
        }
      }
    } catch (error) {
      console.error("❌ Error processing post:", error.response ? error.response.data : error.message);
    }
  }
  
  
  

async function migratePosts() {
  const posts = TEST_MODE ? await fetchWordPressPostsTest() : await fetchWordPressPosts();
  for (const post of posts) {
    await savePostToStrapi(post);
  }
  console.log(`🎉 Migration completed! ${TEST_MODE ? '(TEST MODE - 10 posts only)' : '(FULL MODE)'}`);
}

// Please Run upload_assets script before running this script to upload posts media
migratePosts();
