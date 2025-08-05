import type { Schema, Struct } from '@strapi/strapi';

export interface FiltriServiziFiltriAppartamenti
  extends Struct.ComponentSchema {
  collectionName: 'components_filtri_servizi_filtri_appartamentis';
  info: {
    displayName: 'filtriAppartamenti';
    icon: 'apps';
  };
  attributes: {
    family: Schema.Attribute.Component<'servizi.appartamenti-family', false>;
    main: Schema.Attribute.Component<'servizi.appartamenti-main', false>;
    sport: Schema.Attribute.Component<'servizi.appartamenti-sport', false>;
  };
}

export interface FiltriServiziFiltriBalneari extends Struct.ComponentSchema {
  collectionName: 'components_filtri_servizi_filtri_balnearis';
  info: {
    displayName: 'filtriBalneari';
    icon: 'apps';
  };
  attributes: {
    enogastronomia: Schema.Attribute.Component<
      'servizi.balneari-enogastronomia',
      false
    >;
    family: Schema.Attribute.Component<'servizi.balneari-family', false>;
    main: Schema.Attribute.Component<'servizi.balneari-main', false>;
    wellness: Schema.Attribute.Component<'servizi.balneari-wellness', false>;
  };
}

export interface FiltriServiziFiltriCommercioArtigianato
  extends Struct.ComponentSchema {
  collectionName: 'components_filtri_servizi_filtri_commercio_artigianatos';
  info: {
    displayName: 'filtriCommercioArtigianato';
    icon: 'apps';
  };
  attributes: {
    main: Schema.Attribute.Component<
      'servizi.commercio-artigianato-main',
      false
    >;
  };
}

export interface FiltriServiziFiltriGuideOperatoriWellness
  extends Struct.ComponentSchema {
  collectionName: 'components_filtri_servizi_filtri_guide_operatori_welnesses';
  info: {
    displayName: 'filtriGuideOperatoriWellness';
    icon: 'apps';
  };
  attributes: {
    main: Schema.Attribute.Component<
      'servizi.guide-operatori-wellness-main',
      false
    >;
  };
}

export interface FiltriServiziFiltriRicettivo extends Struct.ComponentSchema {
  collectionName: 'components_filtri_servizi_filtri_ricettivos';
  info: {
    displayName: 'filtriRicettivo';
    icon: 'apps';
  };
  attributes: {
    enogastronomia: Schema.Attribute.Component<
      'servizi.ricettivo-enogastronomia',
      false
    >;
    family: Schema.Attribute.Component<'servizi.ricettivo-family', false>;
    main: Schema.Attribute.Component<'servizi.ricettivo-main', false>;
    premium: Schema.Attribute.Component<'servizi.ricettivo-premium', false>;
    sport: Schema.Attribute.Component<'servizi.ricettivo-sport', false>;
    wellbeing: Schema.Attribute.Component<'servizi.ricettivo-wellbeing', false>;
  };
}

export interface FiltriServiziFiltriRistorazione
  extends Struct.ComponentSchema {
  collectionName: 'components_filtri_servizi_filtri_ristoraziones';
  info: {
    displayName: 'filtriRistorazione';
    icon: 'apps';
  };
  attributes: {
    enogastronomia: Schema.Attribute.Component<
      'servizi.ristorazione-enogastronomia',
      false
    >;
    main: Schema.Attribute.Component<'servizi.ristorazione-main', false>;
  };
}

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

export interface ServiziAppartamentiFamily extends Struct.ComponentSchema {
  collectionName: 'components_servizi_appartamenti_families';
  info: {
    displayName: 'appartamentiFamily';
    icon: 'gate';
  };
  attributes: {
    culla: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    fasciatoio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    giochiBambini: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noleggioPasseggini: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    scaldaBiberon: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    sponde: Schema.Attribute.Boolean;
    tariffeFamily: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    vaschettaNeonati: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziAppartamentiMain extends Struct.ComponentSchema {
  collectionName: 'components_servizi_appartamenti_mains';
  info: {
    displayName: 'appartamentiMain';
    icon: 'gate';
  };
  attributes: {
    accessibile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ariaCondizionata: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    cucinaAttrezzata: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    equipSpiaggia: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lavastoviglie: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lavatrice: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    microonde: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    parcheggio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    petFriendly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    primoSoccorso: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziFamily: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziPulizie: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    spaziEsterni: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    tvSmartTv: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    vistaMare: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    wifi: Schema.Attribute.Boolean;
  };
}

export interface ServiziAppartamentiSport extends Struct.ComponentSchema {
  collectionName: 'components_servizi_appartamenti_sports';
  info: {
    displayName: 'appartamentiSport';
    icon: 'gate';
  };
  attributes: {
    fisioterapiaMassaggi: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    kitRiparazione: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    noleggioAttrezzatura: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    previsioniMeteo: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
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
    animazione: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    pagamentiElettronici: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    parcheggio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    petFriendly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    prenotazioneServiziOnline: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    serviziDisabilita: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    serviziFamiglia: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    serviziSpiaggia: Schema.Attribute.Boolean &
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

export interface ServiziCommercioArtigianatoMain
  extends Struct.ComponentSchema {
  collectionName: 'components_servizi_commercio_artigianato_mains';
  info: {
    displayName: 'commercioArtigianatoMain';
    icon: 'gate';
  };
  attributes: {
    artigianatoLocale: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    degustazioni: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    laboratoriWorkshopCorsi: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    multilingua: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    pacchettiRegalo: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    parcheggio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    prodottiTipici: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    produzione: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziFamily: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    spedizione: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    strutturaAccessibile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    venditaOnline: Schema.Attribute.Boolean;
    visiteGuidate: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziGuideOperatoriWellnessMain
  extends Struct.ComponentSchema {
  collectionName: 'components_servizi_guide_operatori_wellness_mains';
  info: {
    displayName: 'guideOperatoriWellnessMain';
    icon: 'gate';
  };
  attributes: {
    escursioni: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lezioniPrivate: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    massaggiTrattamenti: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    pacchetti: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ritiri: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziDomicilio: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    serviziFamily: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziSpiaggia: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    sportAcquatici: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    talassoterapiaFanghi: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    workshopOlistici: Schema.Attribute.Boolean;
    yogaMeditazione: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziRicettivoEnogastronomia extends Struct.ComponentSchema {
  collectionName: 'components_servizi_ricettivo_enogastronomies';
  info: {
    displayName: 'ricettivoEnogastronomia';
    icon: 'gate';
  };
  attributes: {
    cucinaGlutenFree: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    menuBambini: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    pescatoLocale: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    piattiTradizionali: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    prodottiBio: Schema.Attribute.Boolean;
    prodottiLocali: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziRicettivoFamily extends Struct.ComponentSchema {
  collectionName: 'components_servizi_ricettivo_families';
  info: {
    displayName: 'ricettivoFamily';
    icon: 'gate';
  };
  attributes: {
    alimentiBambini: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    camereFamily: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    culla: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    fasciatoio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    giochiBambini: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noleggioPasseggini: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    scaldaBiberon: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    seggiolone: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    sponde: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    tariffeFamily: Schema.Attribute.Boolean;
    vaschettaNeonati: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziRicettivoMain extends Struct.ComponentSchema {
  collectionName: 'components_servizi_ricettivo_mains';
  info: {
    displayName: 'ricettivoMain';
    icon: 'gate';
  };
  attributes: {
    adultsOnly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    allInclusive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ariaCondizionata: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    cucinaGlutenFree: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    cucinaTipica: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cucinaVegetariana: Schema.Attribute.Boolean;
    escursioni: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    parcheggio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    petFriendly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    piscina: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ristorazione: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziBike: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziFamily: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziSpiaggia: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    serviziSport: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    spa: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    strutturaAccessibile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    vistaMare: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    wifi: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziRicettivoPremium extends Struct.ComponentSchema {
  collectionName: 'components_servizi_ricettivo_premiums';
  info: {
    displayName: 'ricettivoPremium';
    icon: 'gate';
  };
  attributes: {
    benessereFitnessSpaPiscina: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    lavanderia: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    omaggioBenessere: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    reception24h: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziRicettivoSport extends Struct.ComponentSchema {
  collectionName: 'components_servizi_ricettivo_sports';
  info: {
    displayName: 'ricettivoSport';
    icon: 'gate';
  };
  attributes: {
    areaFitness: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    convenzioniFisioterapiaMassaggi: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    custodiaAttrezzature: Schema.Attribute.Boolean;
    flessibilitaOrariPasti: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    kitRiparazione: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    lavanderia: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noleggioAttrezzatura: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    pastiAlSacco: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    prodottiEnergetici: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    ristorazioneSportiva: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziRicettivoWellbeing extends Struct.ComponentSchema {
  collectionName: 'components_servizi_ricettivo_wellbeings';
  info: {
    displayName: 'ricettivoWellbeing';
    icon: 'gate';
  };
  attributes: {
    convenzioneStabilimenti: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    escursioniBenessere: Schema.Attribute.Boolean;
    lavanderia: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    omaggioBenessere: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    prodottiLocali: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    reception24h: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziRistorazioneEnogastronomia
  extends Struct.ComponentSchema {
  collectionName: 'components_servizi_ristorazione_enogastronomies';
  info: {
    displayName: 'ristorazioneEnogastronomia';
    icon: 'gate';
  };
  attributes: {
    pescatoLocale: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    piattiTradizionali: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    prodottiBio: Schema.Attribute.Boolean;
    prodottiLocali: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ServiziRistorazioneMain extends Struct.ComponentSchema {
  collectionName: 'components_servizi_ristorazione_mains';
  info: {
    displayName: 'ristorazioneMain';
    icon: 'gate';
  };
  attributes: {
    adattoGruppi: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cucinaGlutenFree: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    cucinaVegana: Schema.Attribute.Boolean;
    cucinaVegetariana: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    menuBambini: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    parcheggio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    petFriendly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    pizzeria: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ristorazione: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    serviziFamily: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    strutturaAccessibile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    vistaMare: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    wifi: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
      'filtri-servizi.filtri-appartamenti': FiltriServiziFiltriAppartamenti;
      'filtri-servizi.filtri-balneari': FiltriServiziFiltriBalneari;
      'filtri-servizi.filtri-commercio-artigianato': FiltriServiziFiltriCommercioArtigianato;
      'filtri-servizi.filtri-guide-operatori-wellness': FiltriServiziFiltriGuideOperatoriWellness;
      'filtri-servizi.filtri-ricettivo': FiltriServiziFiltriRicettivo;
      'filtri-servizi.filtri-ristorazione': FiltriServiziFiltriRistorazione;
      'navigazione.link-item': NavigazioneLinkItem;
      'navigazione.menu-item': NavigazioneMenuItem;
      'seo-component.meta-social': SeoComponentMetaSocial;
      'seo-component.seo': SeoComponentSeo;
      'servizi.appartamenti-family': ServiziAppartamentiFamily;
      'servizi.appartamenti-main': ServiziAppartamentiMain;
      'servizi.appartamenti-sport': ServiziAppartamentiSport;
      'servizi.balneari-enogastronomia': ServiziBalneariEnogastronomia;
      'servizi.balneari-family': ServiziBalneariFamily;
      'servizi.balneari-main': ServiziBalneariMain;
      'servizi.balneari-wellness': ServiziBalneariWellness;
      'servizi.commercio-artigianato-main': ServiziCommercioArtigianatoMain;
      'servizi.guide-operatori-wellness-main': ServiziGuideOperatoriWellnessMain;
      'servizi.ricettivo-enogastronomia': ServiziRicettivoEnogastronomia;
      'servizi.ricettivo-family': ServiziRicettivoFamily;
      'servizi.ricettivo-main': ServiziRicettivoMain;
      'servizi.ricettivo-premium': ServiziRicettivoPremium;
      'servizi.ricettivo-sport': ServiziRicettivoSport;
      'servizi.ricettivo-wellbeing': ServiziRicettivoWellbeing;
      'servizi.ristorazione-enogastronomia': ServiziRistorazioneEnogastronomia;
      'servizi.ristorazione-main': ServiziRistorazioneMain;
      'shared.card-progetto': SharedCardProgetto;
      'shared.link': SharedLink;
      'shared.logo-cliente': SharedLogoCliente;
    }
  }
}
