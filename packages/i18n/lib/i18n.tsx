import { createContext, useContext, Component } from 'react';
import { getPluralFormNameForCardinalByLocale } from 'fast-plural-rules';
import get from 'lodash/get';
import noop from 'lodash/noop';

type ContextType = {
  translations: any;
  gettext: (text: string, params?: any) => string;
  pgettext: (id: string, text: string, params?: any) => string;
  ngettext: (singular: string, plural: string, count: number, params?: any) => string;
  npgettext: (id: string, singular: string, plural: string, count: number, params?: any) => string;
  setLanguage: (lang: string) => void;
  language: string;
};

export const TarnslationsContext = createContext<ContextType>({} as any);

export function isRtlLanguage(lang: string) {
  const rtlLanguages = ['ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'];
  if (!lang) {
    return false;
  }
  return rtlLanguages.includes(lang.split('-')[0]);
}

export type Language = {
  id: string;
  locale?: string;
  pluralCategoryNames?: string[];
  pluralExamples?: string[];
  pluralRules?: string;
  [key: string]: any;
};

export type StorageType = {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key: string) => void;
};

export type PropTypes = {
  defaultLanguage: string;
  langKey?: string;
  translationsKey?: string;
  storage: typeof localStorage | typeof sessionStorage | StorageType;
  getTranslation: (lang?: string) => any;
  reload?: () => void;
  monoLanguageJSON?: boolean;
  children?: any;
  useDefaultLanguage?: boolean;
  defaultTranslations?: { [key: string]: unknown };
  localeLanguage?: string;
  getLanguages: () => Promise<(Language | string)[]> | string[] | Language[];
};

type State = {
  language: string;
  translations: any;
};

const defaultProps = {
  defaultLanguage: 'en',
  langKey: 'lang',
  translationsKey: 'translations',
  reload: noop,
  monoLanguageJSON: false
};

export class TranslateProvider extends Component<PropTypes, State> {
  langs: (Language | string)[];
  lang: Language | string;
  constructor(props: any) {
    super(props);
    this.langs = [];
    this.state = {
      translations: props.defaultTranslations || {},
      language: props.defaultLanguage.split('-')[0]
    };

    this.gettext = this.gettext.bind(this);
    this.pgettext = this.pgettext.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.ngettext = this.ngettext.bind(this);
    this.npgettext = this.npgettext.bind(this);
    this.refreshTranslations = this.refreshTranslations.bind(this);
    this.initTranslationsLang();
  }

  refreshTranslations(lang: string) {
    const { getTranslation, translationsKey, storage } = this.props;
    Promise.resolve(getTranslation(lang))
      .then((translations) => {
        this.setState({ translations });
        storage &&
          translationsKey &&
          translations &&
          storage.setItem([translationsKey, lang].filter(Boolean).join('_'), JSON.stringify(translations));
      })
      .catch(noop);
  }

  initTranslations(lang: string) {
    const { storage, translationsKey } = this.props;
    if (!storage || !translationsKey) return;
    Promise.resolve(storage.getItem([translationsKey, lang].filter(Boolean).join('_'))).then((translations) => {
      if (!translations) {
        return;
      }
      this.setState({ translations: JSON.parse(translations) });
    });
  }

  saveLang(lang: string) {
    this.lang = this.langs.find((item) => (typeof item === 'string' ? item === lang : (item.id = lang)));
  }

  getLanguage(lang: string, defaultLang: string, langs?: (Language | string)[] | null) {
    if (!Array.isArray(langs)) {
      return lang;
    }
    if (langs.find((item) => (typeof item === 'string' ? item === lang : (item.id = lang)))) {
      return lang;
    }
    return defaultLang;
  }

  initTranslationsLang() {
    if (this.props.useDefaultLanguage) return this.refreshTranslations(this.props.defaultLanguage);
    const { storage, langKey, defaultLanguage } = this.props;
    Promise.all([
      Promise.resolve(storage.getItem(langKey)),
      this.props.getLanguages ? Promise.resolve(this.props.getLanguages()) : null
    ])
      .then(([language, langs]) => {
        this.langs = langs;
        if (!language) {
          return Promise.reject(langs);
        }
        const _lang = this.getLanguage(language, this.props.defaultLanguage, langs);
        this.saveLang(_lang);
        this.setState({ language: _lang });
        this.refreshTranslations(_lang);
        this.initTranslations(_lang);
      })
      .catch((langs) => {
        const _lang = this.getLanguage(this.props.localeLanguage, this.props.defaultLanguage, langs);
        this.saveLang(_lang);
        storage.setItem(langKey, _lang.split('-')[0]);
        this.refreshTranslations(_lang.split('-')[0]);
        this.initTranslations(_lang.split('-')[0]);
      });
  }

  setLanguage(lang: string) {
    if (this.props.useDefaultLanguage) return;
    if (!lang) {
      throw new Error('language should be defined');
    }
    if (typeof lang !== 'string') {
      throw new Error('language should be String');
    }
    this.saveLang(lang);
    const { language } = this.state;
    const { storage, langKey } = this.props;
    this.setState({ language: lang });
    this.refreshTranslations(lang);
    Promise.resolve(storage.setItem(langKey, lang.split('-')[0])).then(() => {
      if (isRtlLanguage(language) !== isRtlLanguage(lang)) {
        this.props.reload && this.props.reload();
      }
    });
  }

  pgettext(text: string, id: string, params?: any) {
    const message = `${text} ${id}`;
    const { monoLanguageJSON } = this.props;
    const { language, translations } = this.state;
    if (monoLanguageJSON) {
      return interpolate(get(translations, `[${id}]`) || text, text, params);
    }
    return interpolate(get(translations, `${language}.[${id}]`) || text, text, params);
  }

  gettext(text = '', params?: any) {
    const { language, translations } = this.state;
    const { monoLanguageJSON } = this.props;

    if (monoLanguageJSON) {
      return interpolate(get(translations, `[${text}]`) || text || '', text, params);
    }
    return interpolate(get(translations, `${language}[${text}]`) || text, text, params);
  }

  ngettext(singular: string, plural: string, count: number, params?: any) {
    const { language, translations } = this.state;
    const { monoLanguageJSON } = this.props;

    const _tranlations = monoLanguageJSON ? translations : get(translations, language);
    const pluralForm = getPluralFormNameForCardinalByLocale(language, count);
    const key = [singular, pluralForm].join('_');

    return interpolate(
      get(_tranlations, key) || (count === 1 ? singular : plural) || '',
      count === 1 ? singular : plural,
      params
    );
  }

  npgettext(singular: string, plural: string, id: string, count: number, params?: any) {
    const { language, translations } = this.state;
    const { monoLanguageJSON } = this.props;

    const _tranlations = monoLanguageJSON ? translations : get(translations, language);
    const pluralForm = getPluralFormNameForCardinalByLocale(language, count);
    const key = [id, pluralForm].join('_');
    return interpolate(
      get(_tranlations, key) || (count === 1 ? singular : plural) || '',
      count === 1 ? singular : plural,
      params
    );
  }

  render() {
    return (
      <TarnslationsContext.Provider
        value={{
          translations: this.state.translations,
          gettext: this.gettext,
          pgettext: this.pgettext,
          ngettext: this.ngettext,
          npgettext: this.npgettext,
          setLanguage: this.setLanguage,
          language: this.state.language
        }}
      >
        {this.props.children}
      </TarnslationsContext.Provider>
    );
  }
}
// @ts-ignore asdasd
TranslateProvider.defaultProps = defaultProps;

export function useTranslations() {
  const { translations: _, ...translationData } = useContext(TarnslationsContext);
  return translationData;
}

export function useGetLanguage() {
  return useContext(TarnslationsContext).language;
}

export function useGettext() {
  return { gettext: useContext(TarnslationsContext).gettext };
}

export function usePGettext() {
  return { pgettext: useContext(TarnslationsContext).pgettext };
}

export function useNGettext() {
  return { ngettext: useContext(TarnslationsContext).ngettext };
}

export function useNPGettext() {
  return { npgettext: useContext(TarnslationsContext).npgettext };
}

export function useSetLanguage() {
  return useContext(TarnslationsContext).setLanguage;
}

export const Translator = TarnslationsContext.Consumer;

export function gettext(text = '', params?: any) {
  return <TarnslationsContext.Consumer>{({ gettext }) => gettext(text, params)}</TarnslationsContext.Consumer>;
}

export function pgettext(id = '', text = '', params?: any) {
  return <TarnslationsContext.Consumer>{({ pgettext }) => pgettext(id, text, params)}</TarnslationsContext.Consumer>;
}

export function ngettext(singular = '', plural = '', count: number, params?: any) {
  return (
    <TarnslationsContext.Consumer>
      {({ ngettext }) => ngettext(singular, plural, count, params)}
    </TarnslationsContext.Consumer>
  );
}

export function npgettext(singular = '', plural = '', id = '', count: number, params?: any) {
  return (
    <TarnslationsContext.Consumer>
      {({ npgettext }) => npgettext(singular, plural, id, count, params)}
    </TarnslationsContext.Consumer>
  );
}

export function interpolate(message: string, defaultLang: string, obj?: any, named?: boolean) {
  let msg: string = message;
  if (typeof message !== 'string') {
    return defaultLang;
  }
  try {
    msg = (message || '').replace(/%\(\w+\)/g, function (match) {
      return String(get(obj, [match.slice(2, -1)]));
    });
  } catch {}
  return msg;
}
