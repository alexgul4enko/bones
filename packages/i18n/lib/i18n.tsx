import '@formatjs/intl-pluralrules/polyfill';
import { createContext, useContext, Component } from 'react';
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
  constructor(props: any) {
    super(props);
    this.state = {
      translations: {},
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

  initTranslationsLang() {
    if (this.props.useDefaultLanguage) return this.refreshTranslations(this.props.defaultLanguage);
    const { storage, langKey, defaultLanguage } = this.props;
    Promise.resolve(storage.getItem(langKey))
      .then((language) => {
        if (!language) {
          throw new Error('Language not defined');
        }
        this.setState({ language });
        this.refreshTranslations(language);
        this.initTranslations(language);
      })
      .catch((_) => {
        storage.setItem(langKey, defaultLanguage.split('-')[0]);
        this.refreshTranslations(defaultLanguage.split('-')[0]);
        this.initTranslations(defaultLanguage.split('-')[0]);
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
      return interpolate(get(translations, `[${id}]`) || text, params);
    }
    return interpolate(get(translations, `${language}.[${id}]`) || text, params);
  }

  gettext(text = '', params?: any) {
    const { language, translations } = this.state;
    const { monoLanguageJSON } = this.props;

    if (monoLanguageJSON) {
      return interpolate(get(translations, `[${text}]`) || text || '', params);
    }
    return interpolate(get(translations, `${language}[${text}]`) || text, params);
  }

  ngettext(singular: string, plural: string, count: number, params?: any) {
    const { language, translations } = this.state;
    const { monoLanguageJSON } = this.props;

    const _tranlations = monoLanguageJSON ? translations : get(translations, language);
    const pluralForm = new Intl.PluralRules(language).select(count);
    const key = [singular, pluralForm].join('_');

    return interpolate(get(_tranlations, key) || (count === 1 ? singular : plural) || '', params);
  }

  npgettext(singular: string, plural: string, id: string, count: number, params?: any) {
    const { language, translations } = this.state;
    const { monoLanguageJSON } = this.props;

    const _tranlations = monoLanguageJSON ? translations : get(translations, language);
    const pluralForm = new Intl.PluralRules(language).select(count);
    const key = [id, pluralForm].join('_');
    return interpolate(get(_tranlations, key) || (count === 1 ? singular : plural) || '', params);
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

export function useGettetxt() {
  return useContext(TarnslationsContext).gettext;
}

export function usePGettetxt() {
  return useContext(TarnslationsContext).pgettext;
}

export function useNGettetxt() {
  return useContext(TarnslationsContext).ngettext;
}

export function useNPGettetxt() {
  return useContext(TarnslationsContext).npgettext;
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

export function interpolate(message: string, obj?: any, named?: boolean) {
  return message.replace(/%\(\w+\)/g, function (match) {
    return String(get(obj, [match.slice(2, -1)]));
  });
}
