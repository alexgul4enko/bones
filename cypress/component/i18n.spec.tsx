import specTitle from 'cypress-sonarqube-reporter/specTitle';
import {
  TranslateProvider,
  useTranslations,
  useGetLanguage,
  useGettext,
  usePGettext,
  useNGettext,
  useNPGettext,
  useSetLanguage,
  gettext,
  pgettext,
  ngettext,
  npgettext
} from '../../packages/i18n/lib/i18n';

function MyTranslationComponent() {
  const setLanguage = useSetLanguage();
  const gettextH = useGettext();
  const pgettextH = usePGettext();
  const ngettextH = useNGettext();
  const npgettextH = useNPGettext();
  const lang = useGetLanguage();
  const trans = useTranslations();
  return (
    <>
      <p data-testid='lang'>{lang}</p>
      <p data-testid='gettext'>{gettext('gettext')}</p>
      <p data-testid='pgettext'>{pgettext('pgettext', 'pgettext_key')}</p>
      <p data-testid='ngettext'>{ngettext('ngettext1', 'ngettext2', 1)}</p>
      <p data-testid='npgettext'>{npgettext('npgettext1', 'npgettext2', 'npgettext_key', 2)}</p>

      <p data-testid='gettextH'>{gettextH('gettextH')}</p>
      <p data-testid='pgettextH'>{pgettextH('pgettextH', 'key')}</p>
      <p data-testid='ngettextH'>{ngettextH('ngettextH1', 'ngettextHt2', 1)}</p>
      <p data-testid='npgettextH'>{npgettextH('npgettextH1', 'npgettextH2', 'key', 2)}</p>

      <p data-testid='gettext_trans'>{trans.gettext('transgettext')}</p>
      <p data-testid='pgettext_trans'>{trans.pgettext('transpgettext', 'key')}</p>
      <p data-testid='ngettext_trans'>{trans.ngettext('transngettext1', 'transngettext2', 1)}</p>
      <p data-testid='npgettext_trans'>{trans.npgettext('transnpgettext1', 'transnpgettext2', 'key', 2)}</p>

      <button
        data-testid='uk'
        onClick={() => {
          setLanguage('uk');
        }}
      >
        solovinoyu
      </button>
      <button
        data-testid='ar'
        onClick={() => {
          setLanguage('ar');
        }}
      >
        arr
      </button>
    </>
  );
}

function translationsByLang(lang) {
  switch (lang) {
    case 'uk':
      return Promise.resolve({
        gettext: 'взяти текст',
        pgettext_key: 'взяти текст по ключу',
        ngettext1_one: 'взяти однину',
        npgettext_key_few: 'взяти множину по ключу'
      });
    case 'ar':
      return Promise.resolve({
        gettext: 'arr_gettext',
        pgettext_key: 'arr_pgettext_key',
        ngettext1_one: 'arr_ngettext1_one',
        npgettext_key_two: 'arr_npgettext_key_two'
      });
    default:
      return Promise.resolve({
        gettext: 'en_gettext',
        pgettext_key: 'en_pgettext_key',
        ngettext1_one: 'en_ngettext1_one',
        npgettext_key_other: 'en_npgettext_key_other'
      });
  }
}

function loadtranslations() {
  return {
    en: {
      gettext: 'en_gettext',
      pgettext_key: 'en_pgettext_key',
      ngettext1_one: 'en_ngettext1_one',
      npgettext_key_other: 'en_npgettext_key_other'
    },
    uk: {
      gettext: 'взяти текст',
      pgettext_key: 'взяти текст по ключу',
      ngettext1_one: 'взяти однину',
      npgettext_key_few: 'взяти множину по ключу'
    },
    ar: {
      gettext: 'arr_gettext',
      pgettext_key: 'arr_pgettext_key',
      ngettext1_one: 'arr_ngettext1_one',
      npgettext_key_two: 'arr_npgettext_key_two'
    }
  };
}

describe(specTitle('@cranium/i18n'), () => {
  it('use default data', () => {
    cy.mount(
      <TranslateProvider defaultLanguage='en' storage={window.localStorage} getTranslation={() => ({})}>
        <MyTranslationComponent />
      </TranslateProvider>
    );

    cy.get('[data-testid=lang]').should('contain', 'en');

    cy.get('[data-testid=gettext]').should('contain', 'gettext');
    cy.get('[data-testid=pgettext]').should('contain', 'pgettext');
    cy.get('[data-testid=ngettext]').should('contain', 'ngettext1');
    cy.get('[data-testid=npgettext]').should('contain', 'npgettext2');

    cy.get('[data-testid=gettextH]').should('contain', 'gettextH');
    cy.get('[data-testid=pgettextH]').should('contain', 'pgettextH');
    cy.get('[data-testid=ngettextH]').should('contain', 'ngettextH1');
    cy.get('[data-testid=npgettextH]').should('contain', 'npgettextH2');

    cy.get('[data-testid=gettext_trans]').should('contain', 'transgettext');
    cy.get('[data-testid=pgettext_trans]').should('contain', 'transpgettext');
    cy.get('[data-testid=ngettext_trans]').should('contain', 'transngettext1');
    cy.get('[data-testid=npgettext_trans]').should('contain', 'transnpgettext2');

    cy.get('[data-testid=uk]').click();

    cy.get('[data-testid=lang]').should('contain', 'uk');

    cy.get('[data-testid=gettext]').should('contain', 'gettext');
    cy.get('[data-testid=pgettext]').should('contain', 'pgettext');
    cy.get('[data-testid=ngettext]').should('contain', 'ngettext1');
    cy.get('[data-testid=npgettext]').should('contain', 'npgettext2');

    cy.get('[data-testid=gettextH]').should('contain', 'gettextH');
    cy.get('[data-testid=pgettextH]').should('contain', 'pgettextH');
    cy.get('[data-testid=ngettextH]').should('contain', 'ngettextH1');
    cy.get('[data-testid=npgettextH]').should('contain', 'npgettextH2');

    cy.get('[data-testid=gettext_trans]').should('contain', 'transgettext');
    cy.get('[data-testid=pgettext_trans]').should('contain', 'transpgettext');
    cy.get('[data-testid=ngettext_trans]').should('contain', 'transngettext1');
    cy.get('[data-testid=npgettext_trans]').should('contain', 'transnpgettext2');

    cy.get('[data-testid=ar]').click();

    cy.get('[data-testid=lang]').should('contain', 'ar');

    cy.get('[data-testid=gettext]').should('contain', 'gettext');
    cy.get('[data-testid=pgettext]').should('contain', 'pgettext');
    cy.get('[data-testid=ngettext]').should('contain', 'ngettext1');
    cy.get('[data-testid=npgettext]').should('contain', 'npgettext2');

    cy.get('[data-testid=gettextH]').should('contain', 'gettextH');
    cy.get('[data-testid=pgettextH]').should('contain', 'pgettextH');
    cy.get('[data-testid=ngettextH]').should('contain', 'ngettextH1');
    cy.get('[data-testid=npgettextH]').should('contain', 'npgettextH2');

    cy.get('[data-testid=gettext_trans]').should('contain', 'transgettext');
    cy.get('[data-testid=pgettext_trans]').should('contain', 'transpgettext');
    cy.get('[data-testid=ngettext_trans]').should('contain', 'transngettext1');
    cy.get('[data-testid=npgettext_trans]').should('contain', 'transnpgettext2');
  });

  it('use translations by lang', () => {
    cy.mount(
      <TranslateProvider
        defaultLanguage='en'
        storage={window.localStorage}
        getTranslation={translationsByLang}
        monoLanguageJSON
      >
        <MyTranslationComponent />
      </TranslateProvider>
    );

    cy.get('[data-testid=lang]').should('contain', 'en');

    cy.get('[data-testid=gettext]').should('contain', 'en_gettext');
    cy.get('[data-testid=pgettext]').should('contain', 'en_pgettext_key');
    cy.get('[data-testid=ngettext]').should('contain', 'en_ngettext1_one');
    cy.get('[data-testid=npgettext]').should('contain', 'en_npgettext_key_other');

    cy.get('[data-testid=uk]').click();

    cy.get('[data-testid=lang]').should('contain', 'uk');

    cy.get('[data-testid=gettext]').should('contain', 'взяти текст');
    cy.get('[data-testid=pgettext]').should('contain', 'взяти текст по ключу');
    cy.get('[data-testid=ngettext]').should('contain', 'взяти однину');
    cy.get('[data-testid=npgettext]').should('contain', 'взяти множину по ключу');
    cy.get('[data-testid=ar]').click();

    cy.get('[data-testid=lang]').should('contain', 'ar');

    cy.get('[data-testid=gettext]').should('contain', 'arr_gettext');
    cy.get('[data-testid=pgettext]').should('contain', 'arr_pgettext_key');
    cy.get('[data-testid=ngettext]').should('contain', 'arr_ngettext1_one');
    cy.get('[data-testid=npgettext]').should('contain', 'arr_npgettext_key_two');
  });

  it('use translations all langs at once', () => {
    cy.mount(
      <TranslateProvider
        defaultLanguage='en'
        storage={window.localStorage}
        getTranslation={loadtranslations}
        monoLanguageJSON={false}
      >
        <MyTranslationComponent />
      </TranslateProvider>
    );

    cy.get('[data-testid=lang]').should('contain', 'en');

    cy.get('[data-testid=gettext]').should('contain', 'en_gettext');
    cy.get('[data-testid=pgettext]').should('contain', 'en_pgettext_key');
    cy.get('[data-testid=ngettext]').should('contain', 'en_ngettext1_one');
    cy.get('[data-testid=npgettext]').should('contain', 'en_npgettext_key_other');

    cy.get('[data-testid=uk]').click();

    cy.get('[data-testid=lang]').should('contain', 'uk');

    cy.get('[data-testid=gettext]').should('contain', 'взяти текст');
    cy.get('[data-testid=pgettext]').should('contain', 'взяти текст по ключу');
    cy.get('[data-testid=ngettext]').should('contain', 'взяти однину');
    cy.get('[data-testid=npgettext]').should('contain', 'взяти множину по ключу');
    cy.get('[data-testid=ar]').click();

    cy.get('[data-testid=lang]').should('contain', 'ar');

    cy.get('[data-testid=gettext]').should('contain', 'arr_gettext');
    cy.get('[data-testid=pgettext]').should('contain', 'arr_pgettext_key');
    cy.get('[data-testid=ngettext]').should('contain', 'arr_ngettext1_one');
    cy.get('[data-testid=npgettext]').should('contain', 'arr_npgettext_key_two');
  });
});
