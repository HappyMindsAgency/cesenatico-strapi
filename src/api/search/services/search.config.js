// search.config.js

'use strict';

module.exports = [
  
  // ======================
  // SINGLE TYPES
  // ======================

  {
    uid: 'api::pagina-autunno.pagina-autunno',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'sottotitolo', 
      'anteprima'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'anteprima', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/autunno`,
  },

  {
    uid: 'api::pagina-cesenatico-dintorni.pagina-cesenatico-dintorni',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'introText',
      'cesenaticoIntroTitolo',
      'cesenaticoIntroSottotitolo',
      'cesenaticoIntroText',
      'cesenaticoCosaFare',
      'cesenaticoCosaVedere',
      'cesenaticoInfoTitolo',
      'cesenaticoInfoText',
      'gatteoIntroTitolo',
      'gatteoIntroSottotitolo',
      'gatteoIntroText',
      'gatteoCosaFare',
      'gatteoCosaVedere',
      'gatteoInfoTitolo',
      'gatteoInfoText',
      'sanmauroIntroTitolo',
      'sanmauroIntroSottotitolo',
      'sanmauroIntroText',
      'sanmauroCosaFare',
      'sanmauroCosaVedere',
      'sanmauroInfoTitolo',
      'sanmauroInfoText',
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'introText', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/cesenatico-e-dintorni`,
  },

  {
    uid: 'api::pagina-cesenatico-plus.pagina-cesenatico-plus',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/cesenatico-plus`,
  },

  {
    uid: 'api::pagina-come-arrivare.pagina-come-arrivare',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'sottotitolo',
      'titoloComeArrivare',
      'sottotitoloComeArrivare',
      'titoloComeMuoversi',
      'sottotitoloComeMuoversi',
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/come-arrivare`,
  },

  {
    uid: 'api::pagina-contatti.pagina-contatti',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'contenuto'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'contenuto', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/contatti`,
  },

  {
    uid: 'api::pagina-cookie-policy.pagina-cookie-policy',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'contenuto'
    ],
    populate: [],
    preview: {
      image: null,        // nome del campo media
      titolo: 'titolo',
      excerpt: 'contenuto', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/cookie-policy`,
  },

  {
    uid: 'api::pagina-cosa-fare.pagina-cosa-fare',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/cosa-fare`,
  },

  {
    uid: 'api::pagina-dove-dormire.pagina-dove-dormire',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'introTitolo', 
      'introSottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/dove-dormire`,
  },

  {
    uid: 'api::pagina-dove-mangiare.pagina-dove-mangiare',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'introTitolo', 
      'introSottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/dove-mangiare`,
  },

  {
    uid: 'api::pagina-esplora-il-borgo.pagina-esplora-il-borgo',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/esplora-il-borgo`,
  },

  {
    uid: 'api::pagina-estate.pagina-estate',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'anteprima'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'anteprima', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/estate`,
  },

  {
    uid: 'api::pagina-eventi.pagina-eventi',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'sottotitolo',
      'introTitolo',
      'introSottotitolo',
      'downloadTitolo',
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/eventi`,
  },

  {
    uid: 'api::pagina-experience.pagina-experience',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'introTitolo', 
      'introSottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/experience`,
  },

  {
    uid: 'api::pagina-home.pagina-home',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'introTitolo',
      'introSottotitolo',
      'titoloTematiche',
      'sottotitoloTematiche',
      'eventiTitolo',
      'eventiSottotitolo',
      'esploraTitolo',
      'esploraSottotitolo',
    ],
    populate: [],
    preview: {
      image: null,        // nome del campo media
      titolo: 'introTitolo',
      excerpt: 'introSottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}`,
  },

  {
    uid: 'api::pagina-info-e-servizi-turistici.pagina-info-e-servizi-turistici',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'sottotitolo',
      'introTitolo',
      'introSottotitolo',
      'introText',
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/info-e-servizi-turistici`,
  },

  {
    uid: 'api::pagina-inverno.pagina-inverno',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'anteprima'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'anteprima', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/inverno`,
  },

  {
    uid: 'api::pagina-mappe-e-brochure.pagina-mappe-e-brochure',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'introTitolo', 
      'introSottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/mappe-e-brochure`,
  },

  {
    uid: 'api::pagina-newsletter.pagina-newsletter',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'introTitolo', 
      'introSottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/newsletter`,
  },

  {
    uid: 'api::pagina-offerte.pagina-offerte',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'introTitolo', 
      'introSottotitolo'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/offerte`,
  },

  {
    uid: 'api::pagina-pianifica-il-tuo-viaggio.pagina-pianifica-il-tuo-viaggio',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'sottotitolo',
      'introOcchiello',
      'introTitolo',
      'introTesto',
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/pianifica-il-tuo-viaggio`,
  },

  {
    uid: 'api::pagina-premium.pagina-premium',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'sottotitolo',
      'introOcchiello',
      'introTitolo',
      'introTesto',
      'strutturePremiumTitolo',
      'strutturePremiumSottotitolo',
      'experiencePremiumTitolo',
      'experiencePremiumSottotitolo',
      'offertePremiumTitolo',
      'offertePremiumSottotitolo',
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'introTesto', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/premium`,
  },

  {
    uid: 'api::pagina-primavera.pagina-primavera',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'sottotitolo', 
      'anteprima'
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'anteprima', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/primavera`,
  },

  {
    uid: 'api::pagina-privacy-policy.pagina-privacy-policy',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo', 
      'contenuto'
    ],
    populate: [],
    preview: {
      image: null,        // nome del campo media
      titolo: 'titolo',
      excerpt: 'contenuto', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/privacy-policy`,
  },

  {
    uid: 'api::pagina-vacanze-accessibili.pagina-vacanze-accessibili',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'sottotitolo',
      'esploraTitolo',
      'esploraSottotitolo',
      'pianificaTitolo',
      'pianificaSottotitolo',
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/vacanze-accessibili`,
  },

  {
    uid: 'api::pagina-vivi-cesenatico.pagina-vivi-cesenatico',
    kind: 'single',
    typeLabel: 'Pagine',
    typeSlug: 'pagina',
    fields: [
      'titolo',
      'sottotitolo',
      'experienceTitolo',
      'experienceSottotitolo',
      'offerteTitolo',
      'offerteSottotitolo',
      'eventiTitolo',
      'eventiSottotitolo',
    ],
    populate: [
      'cover'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'sottotitolo', // campo testo per riassunto
      data: {},
      slug: 'documentId'
    },
    url: (_, locale) => `/${locale}/vivi-cesenatico`,
  },

  // ======================
  // COLLECTION TYPES
  // ======================

  {
    uid: 'api::evento.evento',
    kind: 'collection',
    typeLabel: 'Eventi',
    typeSlug: 'evento',
    fields: [
      'titolo',
      'descrizione',
      // 'organizzatori',
      // 'linkEtichetta',
      'linkUrl',
      'localita',
    ],
    populate: [
      'cover', 
      'categoria_evento'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'descrizione', // campo testo per riassunto
      data: {
        dataInizio: 'dataInizio', 
        dataFine: 'dataFine', 
        categoria_evento: 'categoria_evento.titolo',
        majorEvent: 'majorEvent'
      },
      slug: 'slug'
    },
    url: (item, locale) => `/${locale}/eventi/${item.slug}`,
  },

  {
    uid: 'api::experience.experience',
    kind: 'collection',
    typeLabel: 'Experience',
    typeSlug: 'experience',
    priority: 2,
    fields: [
      'titolo',
      'descrizione',
      'serviziInclusi',
      'serviziEsclusi',
      'luogo',
      // 'durata',
      // 'etichettaPrezzo',
      'consigliato',
      // 'lingueDisponibili',
      // 'policyMaltempo',
      // 'policyCancellazione',
      // 'policyAnnullamento',
    ],
    populate: [
      'cover', 
      'categoria_cosafare'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'descrizione', // campo testo per riassunto
      data: {
        etichettaPrezzo: 'etichettaPrezzo',
        prezzo: 'prezzo',
        categoria_cosafare: 'categoria_cosafare.titolo',
      },
      slug: 'slug'
    },
    url: (item, locale) => `/${locale}/experience/${item.slug}`,
  },

  {
    uid: 'api::struttura.struttura',
    kind: 'collection',
    typeLabel: 'Strutture',
    typeSlug: 'struttura',
    fields: [
      'titolo',
      'descrizione',
      'indirizzo',
      // 'pivaCode',
      'cinCode',
      // 'cfCode',
      // 'telefono',
      // 'telefono2',
      'sitoWeb',
      'facebook',
      'instagram',
    ],
    populate: [
      'cover', 
      'categoria_struttura'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'descrizione', // campo testo per riassunto
      data: {
        categoria_struttura: 'categoria_struttura.titolo'
      },
      slug: 'slug'
    },
    url: (item, locale) => `/${locale}/strutture/${item.slug}`,
  },

  {
    uid: 'api::articolo.articolo',
    kind: 'collection',
    typeLabel: 'Articoli',
    typeSlug: 'articolo',
    priority: 1,
    fields: [
      'titolo', 
      'content'
    ],
    populate: [
      'cover', 
      'categoria_esplora'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'content', // campo testo per riassunto
      data: {
        categoria_esplora: 'categoria_esplora.titolo'
      },
      slug: 'slug'
    },
    url: (item, locale) => `/${locale}/articoli/${item.slug}`,
  },

  {
    uid: 'api::offerta.offerta',
    kind: 'collection',
    typeLabel: 'Offerte',
    typeSlug: 'offerta',
    fields: [
      'titolo', 
      'descrizione'
    ],
    populate: [
      'cover', 
      'categoria_offerta',
      'struttura'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'descrizione', // campo testo per riassunto
      data: {
        prezzo: 'prezzo',
        categoria_offerta: 'categoria_offerta.titolo',
        struttura: 'struttura.slug'
      },
      slug: 'slug'
    },
    url: (item, locale) => `/${locale}/offerte/${item.slug}`,
  },

  {
    uid: 'api::download.download',
    kind: 'collection',
    typeLabel: 'Download',
    typeSlug: 'download',
    fields: [
      'titolo', 
      'descrizione'
    ],
    populate: [
      'categoria_downloads',
      'file'
    ],
    preview: {
      image: null,        // nome del campo media
      titolo: 'titolo',
      excerpt: 'descrizione', // campo testo per riassunto
      data: {
        categoria_downloads: 'categoria_downloads.titolo',
        file_size: 'file.size',
        file_url: 'file.url',
      },
      slug: 'slug'
    },
    url: (item, locale) => `/${locale}/download/${item.slug}`,
  },

  {
    uid: 'api::poi.poi',
    kind: 'collection',
    typeLabel: 'Luoghi',
    typeSlug: 'poi',
    fields: [
      'titolo',
      'descrizione',
      'indirizzo',
      // 'googleMapsLink',
      // 'orario',
      // 'contatti',
    ],
    populate: [
      'cover', 
      'categoria_esplora'
    ],
    preview: {
      image: 'cover.formats.medium.url',        // nome del campo media
      titolo: 'titolo',
      excerpt: 'descrizione', // campo testo per riassunto
      data: {
        categoria_esplora: 'categoria_esplora.titolo'
      },
      slug: 'slug'
    },
    url: (item, locale) => `/${locale}/luoghi/${item.slug}`,
  }

];
