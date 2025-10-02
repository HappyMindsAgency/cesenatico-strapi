import type { Schema, Struct } from '@strapi/strapi';

export interface CustomComponenteTematica extends Struct.ComponentSchema {
  collectionName: 'components_custom_componente_tematicas';
  info: {
    displayName: 'ComponenteTematica';
    icon: 'apps';
  };
  attributes: {
    immagine: Schema.Attribute.Media<'images'>;
    pulsante: Schema.Attribute.Component<'shared.pulsante', false>;
    testo: Schema.Attribute.RichText;
    titolo: Schema.Attribute.String;
  };
}

export interface CustomCtaPremium extends Struct.ComponentSchema {
  collectionName: 'components_custom_cta_premiums';
  info: {
    displayName: 'ctaPremium';
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    callToAction: Schema.Attribute.Component<'shared.call-to-action', false>;
    immagine: Schema.Attribute.Media<'images'>;
    nomeCTA: Schema.Attribute.String;
  };
}

export interface CustomHeaderHero extends Struct.ComponentSchema {
  collectionName: 'components_custom_header_heroes';
  info: {
    displayName: 'headerHero';
    icon: 'expand';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos'> &
      Schema.Attribute.Required;
    etichetta: Schema.Attribute.String & Schema.Attribute.Required;
    pulsante: Schema.Attribute.Component<'shared.pulsante', false>;
    titolo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CustomLinkCorrelato extends Struct.ComponentSchema {
  collectionName: 'components_custom_link_correlatoes';
  info: {
    displayName: 'LinkCorrelato';
    icon: 'manyToMany';
  };
  attributes: {
    immagine: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    testo: Schema.Attribute.RichText;
    titolo: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CustomMappa extends Struct.ComponentSchema {
  collectionName: 'components_custom_mappas';
  info: {
    displayName: 'Mappa';
    icon: 'pinMap';
  };
  attributes: {
    altezza: Schema.Attribute.String & Schema.Attribute.DefaultTo<'400px'>;
    latitudine: Schema.Attribute.Decimal & Schema.Attribute.Required;
    longitudine: Schema.Attribute.Decimal & Schema.Attribute.Required;
    zoom: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<12>;
  };
}

export interface CustomMezzoTrasporto extends Struct.ComponentSchema {
  collectionName: 'components_custom_mezzo_trasportos';
  info: {
    displayName: 'MezzoTrasporto';
    icon: 'walk';
  };
  attributes: {
    fullColumn: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    icona: Schema.Attribute.String;
    testo: Schema.Attribute.RichText;
    titolo: Schema.Attribute.String;
  };
}

export interface CustomSezioneTematica extends Struct.ComponentSchema {
  collectionName: 'components_custom_sezione_tematicas';
  info: {
    displayName: 'sezioneTematica';
    icon: 'alien';
  };
  attributes: {
    categoria_cosa_fare: Schema.Attribute.Relation<
      'oneToOne',
      'api::categoria-cosa-fare.categoria-cosa-fare'
    >;
    occhiello: Schema.Attribute.String;
    titolo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CustomTabSezioni extends Struct.ComponentSchema {
  collectionName: 'components_custom_tab_sezionis';
  info: {
    displayName: 'tabSezioni';
  };
  attributes: {
    boxContenuto: Schema.Attribute.Component<'shared.box-correlato', true>;
    etichetta: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface FiltriServiziFiltriServizi extends Struct.ComponentSchema {
  collectionName: 'components_filtri_servizi_filtri_servizis';
  info: {
    displayName: 'filtriServizi';
    icon: 'bulletList';
  };
  attributes: {
    categoriaServizi: Schema.Attribute.Enumeration<
      [
        'appartamenti',
        'balneari',
        'commercioArtigianato',
        'guideOperatoriWellness',
        'ricettivo',
        'ristorazione',
      ]
    > &
      Schema.Attribute.Required;
    filtriAppartamenti: Schema.Attribute.Component<
      'filtri-servizi.filtri-appartamenti',
      false
    >;
    filtriBalneari: Schema.Attribute.Component<
      'filtri-servizi.filtri-balneari',
      false
    >;
    filtriCommercioArtigianato: Schema.Attribute.Component<
      'filtri-servizi.filtri-commercio-artigianato',
      false
    >;
    filtriGuideOperatoriWellness: Schema.Attribute.Component<
      'filtri-servizi.filtri-guide-operatori-wellness',
      false
    >;
    filtriRicettivo: Schema.Attribute.Component<
      'filtri-servizi.filtri-ricettivo',
      false
    >;
    filtriRistorazione: Schema.Attribute.Component<
      'filtri-servizi.filtri-ristorazione',
      false
    >;
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
    kitPrimoSoccorso: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    lavastoviglie: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lavatrice: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    microonde: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    parcheggio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    petFriendly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    prenotazioneOnline: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    prodottiBio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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

export interface SharedBoxCorrelato extends Struct.ComponentSchema {
  collectionName: 'components_shared_box_correlatoes';
  info: {
    displayName: 'BoxCorrelato';
    icon: 'apps';
  };
  attributes: {
    immagine: Schema.Attribute.Media<'images'>;
    larghezzaIntera: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    testo: Schema.Attribute.RichText;
    titolo: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_shared_call_to_actions';
  info: {
    description: '';
    displayName: 'CallToAction';
    icon: 'crown';
  };
  attributes: {
    descrizione: Schema.Attribute.RichText;
    pulsante: Schema.Attribute.Component<'shared.link', false>;
    sottotitolo: Schema.Attribute.String;
    titolo: Schema.Attribute.String;
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

export interface SharedCodice extends Struct.ComponentSchema {
  collectionName: 'components_shared_codices';
  info: {
    description: '';
    displayName: 'Codice';
    icon: 'code';
  };
  attributes: {
    body: Schema.Attribute.Text;
    head: Schema.Attribute.Text;
    idAncora: Schema.Attribute.String;
    titolo: Schema.Attribute.String;
  };
}

export interface SharedContainerTextAndSlide extends Struct.ComponentSchema {
  collectionName: 'components_shared_container_text_and_slides';
  info: {
    displayName: 'ContainerText&Slide';
    icon: 'arrowRight';
  };
  attributes: {
    riga: Schema.Attribute.Component<'shared.text-and-slide', true>;
  };
}

export interface SharedCounter extends Struct.ComponentSchema {
  collectionName: 'components_shared_counters';
  info: {
    description: '';
    displayName: 'counter';
    icon: 'chartPie';
  };
  attributes: {
    numero: Schema.Attribute.Integer;
    simbolo: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 1;
      }>;
    sottotitolo: Schema.Attribute.Text;
    titolo: Schema.Attribute.String;
  };
}

export interface SharedCtaMagenta extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_magentas';
  info: {
    description: '';
    displayName: 'CtaBackground';
    icon: 'heart';
  };
  attributes: {
    colonna: Schema.Attribute.Component<'shared.card-progetto', true>;
  };
}

export interface SharedDocumento extends Struct.ComponentSchema {
  collectionName: 'components_shared_documentos';
  info: {
    displayName: 'Documento';
    icon: 'file';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', false>;
    file: Schema.Attribute.Media<'files'>;
    name: Schema.Attribute.String;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    description: '';
    displayName: 'Faq';
    icon: 'question';
  };
  attributes: {
    domanda: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.link', false>;
    risposta: Schema.Attribute.RichText;
  };
}

export interface SharedFormLanding extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_landings';
  info: {
    displayName: 'FormLanding';
    icon: 'envelop';
  };
  attributes: {
    descrizione: Schema.Attribute.RichText;
    idForm: Schema.Attribute.String;
    titolo: Schema.Attribute.String;
  };
}

export interface SharedFormat extends Struct.ComponentSchema {
  collectionName: 'components_shared_formats';
  info: {
    description: '';
    displayName: 'Format';
    icon: 'briefcase';
  };
  attributes: {
    ctaFormat: Schema.Attribute.Component<'shared.link', false>;
    descrizione: Schema.Attribute.RichText;
    progetti: Schema.Attribute.Component<'shared.card-progetto', true>;
    titolo: Schema.Attribute.String;
  };
}

export interface SharedInfoAndIcona extends Struct.ComponentSchema {
  collectionName: 'components_shared_info_and_iconas';
  info: {
    description: '';
    displayName: 'info&icona';
    icon: 'chartCircle';
  };
  attributes: {
    icona: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'https://fontawesome.com/search?q=cerca&o=r&ic=free'>;
    info: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface SharedIntro extends Struct.ComponentSchema {
  collectionName: 'components_shared_intros';
  info: {
    displayName: 'intro';
    icon: 'pin';
  };
  attributes: {
    immagine: Schema.Attribute.Media<'images'>;
    occhiello: Schema.Attribute.String;
    testo: Schema.Attribute.RichText;
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

export interface SharedMagellan extends Struct.ComponentSchema {
  collectionName: 'components_shared_magellans';
  info: {
    displayName: 'Magellan';
    icon: 'stack';
  };
  attributes: {
    collegamenti: Schema.Attribute.Component<'shared.simple-link', true>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    description: '';
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    idAncora: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedPulsante extends Struct.ComponentSchema {
  collectionName: 'components_shared_pulsantes';
  info: {
    description: '';
    displayName: 'Pulsante';
    icon: 'cursor';
  };
  attributes: {
    destinazioneLink: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    etichetta: Schema.Attribute.String;
    titleParam: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.DefaultTo<'https://'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    description: '';
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    idAncora: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    idAncora: Schema.Attribute.String;
  };
}

export interface SharedRigaCounter extends Struct.ComponentSchema {
  collectionName: 'components_shared_riga_counters';
  info: {
    description: '';
    displayName: 'RigaCounter';
    icon: 'chartPie';
  };
  attributes: {
    counter: Schema.Attribute.Component<'shared.counter', true>;
    immagine: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedShortcode extends Struct.ComponentSchema {
  collectionName: 'components_shared_shortcodes';
  info: {
    description: '';
    displayName: 'Shortcode';
    icon: 'code';
  };
  attributes: {
    entita: Schema.Attribute.Enumeration<
      ['Attivit\u00E0', 'Experience', 'POI']
    >;
    quantita: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    titolo: Schema.Attribute.String;
  };
}

export interface SharedSimpleLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_simple_links';
  info: {
    displayName: 'SimpleLink';
    icon: 'stack';
  };
  attributes: {
    class: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
    idAncora: Schema.Attribute.String;
  };
}

export interface SharedSliderClienti extends Struct.ComponentSchema {
  collectionName: 'components_shared_slider_clientis';
  info: {
    displayName: 'sliderClienti';
    icon: 'briefcase';
  };
  attributes: {
    cliente: Schema.Attribute.Component<'shared.logo-cliente', true>;
  };
}

export interface SharedTextAndSlide extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_and_slides';
  info: {
    description: '';
    displayName: 'Text&Slide';
    icon: 'arrowRight';
  };
  attributes: {
    paragrafo1: Schema.Attribute.RichText;
    paragrafo2: Schema.Attribute.RichText;
    reverseColumn: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    slider: Schema.Attribute.Media<'images', true>;
    sottotitolo: Schema.Attribute.String;
    titolo: Schema.Attribute.String;
  };
}

export interface SharedVideoHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_video_headers';
  info: {
    description: '';
    displayName: 'VideoHeader';
    icon: 'play';
  };
  attributes: {
    descrizione: Schema.Attribute.RichText;
    pulsante: Schema.Attribute.Component<'shared.link', false>;
    sottotitolo: Schema.Attribute.Text;
    titolo: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos' | 'images'> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'custom.componente-tematica': CustomComponenteTematica;
      'custom.cta-premium': CustomCtaPremium;
      'custom.header-hero': CustomHeaderHero;
      'custom.link-correlato': CustomLinkCorrelato;
      'custom.mappa': CustomMappa;
      'custom.mezzo-trasporto': CustomMezzoTrasporto;
      'custom.sezione-tematica': CustomSezioneTematica;
      'custom.tab-sezioni': CustomTabSezioni;
      'filtri-servizi.filtri-appartamenti': FiltriServiziFiltriAppartamenti;
      'filtri-servizi.filtri-balneari': FiltriServiziFiltriBalneari;
      'filtri-servizi.filtri-commercio-artigianato': FiltriServiziFiltriCommercioArtigianato;
      'filtri-servizi.filtri-guide-operatori-wellness': FiltriServiziFiltriGuideOperatoriWellness;
      'filtri-servizi.filtri-ricettivo': FiltriServiziFiltriRicettivo;
      'filtri-servizi.filtri-ristorazione': FiltriServiziFiltriRistorazione;
      'filtri-servizi.filtri-servizi': FiltriServiziFiltriServizi;
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
      'shared.box-correlato': SharedBoxCorrelato;
      'shared.call-to-action': SharedCallToAction;
      'shared.card-progetto': SharedCardProgetto;
      'shared.codice': SharedCodice;
      'shared.container-text-and-slide': SharedContainerTextAndSlide;
      'shared.counter': SharedCounter;
      'shared.cta-magenta': SharedCtaMagenta;
      'shared.documento': SharedDocumento;
      'shared.faq': SharedFaq;
      'shared.form-landing': SharedFormLanding;
      'shared.format': SharedFormat;
      'shared.info-and-icona': SharedInfoAndIcona;
      'shared.intro': SharedIntro;
      'shared.link': SharedLink;
      'shared.logo-cliente': SharedLogoCliente;
      'shared.magellan': SharedMagellan;
      'shared.media': SharedMedia;
      'shared.open-graph': SharedOpenGraph;
      'shared.pulsante': SharedPulsante;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.riga-counter': SharedRigaCounter;
      'shared.shortcode': SharedShortcode;
      'shared.simple-link': SharedSimpleLink;
      'shared.slider': SharedSlider;
      'shared.slider-clienti': SharedSliderClienti;
      'shared.text-and-slide': SharedTextAndSlide;
      'shared.video-header': SharedVideoHeader;
    }
  }
}
