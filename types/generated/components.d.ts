import type { Schema, Struct } from '@strapi/strapi';

export interface NavigazioneLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_navigazione_link_items';
  info: {
    description: '';
    displayName: 'Link Item';
    icon: 'link';
  };
  attributes: {
    class: Schema.Attribute.String;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    target: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface NavigazioneMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigazione_menu_items';
  info: {
    description: '';
    displayName: 'Menu Item';
    icon: 'code';
  };
  attributes: {
    figli: Schema.Attribute.Component<'shared.logo-cliente', true>;
    genitore: Schema.Attribute.Component<'navigazione.link-item', false>;
    megamenu: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    nameItem: Schema.Attribute.String;
  };
}

export interface SeoComponentMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_seo_component_meta_socials';
  info: {
    description: '';
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SeoComponentSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'> &
      Schema.Attribute.Required;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'seo-component.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface ServiziBalneariEnogastronomia extends Struct.ComponentSchema {
  collectionName: 'components_servizi_balneari_enogastronomias';
  info: {
    displayName: 'balneariEnogastronomia';
    icon: 'restaurant';
  };
  attributes: {
    glutenFree: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    menuBambini: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    menuInglese: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ospitiEsterni: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    pescatoLocale: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    piattiLocali: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    prenotazioneOnline: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    prodottiBio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    provenienzaLocale: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziBalneariFamily extends Struct.ComponentSchema {
  collectionName: 'components_servizi_balneari_families';
  info: {
    displayName: 'balneariFamily';
    icon: 'puzzle';
  };
  attributes: {
    areaBambini: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ausiliPasseggino: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    fasciatoioPasseggino: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    primoSoccorso: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    scaldaBiberon: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziBalneariMain extends Struct.ComponentSchema {
  collectionName: 'components_servizi_balneari_mains';
  info: {
    displayName: 'balneariMain';
    icon: 'sun';
  };
  attributes: {
    adattoGruppi: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    animazione: Schema.Attribute.Boolean;
    barRistorazione: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    canoeSupPedalo: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    corsiSportivi: Schema.Attribute.Boolean;
    cucinaGlutenFree: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    cucinaVegetariana: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    eventiSpiaggia: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    ombrelloneLettini: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    pagamentiElettronici: Schema.Attribute.Boolean;
    parcheggio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    petFriendly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    prenotazioneServiziOnline: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    serviziDisabilita: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    serviziFamiglia: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    servizioSpiaggia: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    spiaggiaAccessibile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    strutturaAccessibile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    wifi: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziBalneariWellness extends Struct.ComponentSchema {
  collectionName: 'components_servizi_balneari_wellnesses';
  info: {
    displayName: 'balneariWellness';
    icon: 'seed';
  };
  attributes: {
    elioterapia: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    offertaWellness: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    serviziWellness: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedCardProgetto extends Struct.ComponentSchema {
  collectionName: 'components_shared_card_progettos';
  info: {
    description: '';
    displayName: 'CardProgetto';
    icon: 'briefcase';
  };
  attributes: {
    ctaProgetto: Schema.Attribute.Component<'shared.link', false>;
    descrizione: Schema.Attribute.RichText;
    immagine: Schema.Attribute.Media<'images', true>;
    sottotitolo: Schema.Attribute.String;
    titolo: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: '';
    displayName: 'Link/Pulsante';
    icon: 'cursor';
  };
  attributes: {
    class: Schema.Attribute.String;
    link: Schema.Attribute.String;
    targetBlank: Schema.Attribute.Boolean;
    testoLink: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedLogoCliente extends Struct.ComponentSchema {
  collectionName: 'components_shared_logo_clientes';
  info: {
    description: '';
    displayName: 'logoCliente';
    icon: 'walk';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', false>;
    logo: Schema.Attribute.Media<'images'>;
    nome: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'navigazione.link-item': NavigazioneLinkItem;
      'navigazione.menu-item': NavigazioneMenuItem;
      'seo-component.meta-social': SeoComponentMetaSocial;
      'seo-component.seo': SeoComponentSeo;
      'servizi.balneari-enogastronomia': ServiziBalneariEnogastronomia;
      'servizi.balneari-family': ServiziBalneariFamily;
      'servizi.balneari-main': ServiziBalneariMain;
      'servizi.balneari-wellness': ServiziBalneariWellness;
      'shared.card-progetto': SharedCardProgetto;
      'shared.link': SharedLink;
      'shared.logo-cliente': SharedLogoCliente;
    }
  }
}
