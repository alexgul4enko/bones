import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import noop from 'lodash/noop'

export const TarnslationsContext = React.createContext('translations')

export function isRtlLanguage(lang) {
  const rtlLanguages = ['ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi']
  if(!lang) { return false }
  return rtlLanguages.includes(lang.split('-')[0])
}

const propTypes = {
  defaultLanguage: PropTypes.string,
  langKey: PropTypes.string,
  translationsKey: PropTypes.string,
  storage: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  api: PropTypes.object.isRequired,
  reload: PropTypes.func,
}

const defaultProps = {
  defaultLanguage: 'en',
  langKey: 'lang',
  translationsKey: 'translations',
  reload: noop,
}

export const TranslationPropTypes = {
  translations: PropTypes.object.isRequired,
  gettext: PropTypes.func.isRequired,
  pgettext: PropTypes.func.isRequired,
  ngettext: PropTypes.func.isRequired,
  npgettext: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
}

export class TranslateProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      translations: {},
      language: props.defaultLanguage.split('-')[0],
    }
    this.gettext = this.gettext.bind(this)
    this.pgettext = this.pgettext.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
    this.ngettext = this.ngettext.bind(this)
    this.npgettext = this.npgettext.bind(this)
    this.initTranslationsLang()
    this.initTranslations()
    this.refreshTranslations()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.translations !== nextState.translations || this.state.language !== nextState.language
  }

  refreshTranslations() {
    const { api, url, translationsKey, storage } = this.props
    api.get(url)
      .then(translations => {
        this.setState({ translations })
        storage.setItem(translationsKey, JSON.stringify(translations))
      })
  }

  initTranslations() {
    const { storage, translationsKey } = this.props
    Promise.resolve(storage.getItem(translationsKey))
      .then(translations => {
        if(!translations) { return }
        this.setState({ translations: JSON.parse(translations) })
      })
  }

  initTranslationsLang() {
    const { storage, langKey, defaultLanguage } = this.props
    Promise.resolve(storage.getItem(langKey))
      .then(language => {
        if(!language) { throw new Error('Language not defined') }
        this.setState({ language })
      })
      .catch(err => storage.setItem(langKey, defaultLanguage.split('-')[0]))
  }

  setLanguage(lang) {
    if(!lang) {
      throw new Error('language should be defuned')
    }
    if(typeof lang !== 'string') {
      throw new Error('language should be String')
    }
    const { language } = this.state
    const { storage, langKey } = this.props
    this.setState({ language: lang })
    Promise.resolve(storage.setItem(langKey, lang.split('-')[0]))
      .then(() => {
        if(isRtlLanguage(language) !== isRtlLanguage(lang)) {
          this.props.reload && this.props.reload()
        }
      })
  }

  pgettext(id, text) {
    const message = `${text} ${id}`
    return this.gettext(message)
  }

  gettext(text = '') {
    const { language, translations } = this.state
    return get(translations, `[${text}].${language}`, get(translations, `[${text}].en`)) || text
  }

  ngettext(singular, plural, count) {
    const { language, translations } = this.state
    const translation = get(translations, `[${singular}].${language}`, get(translations, `[${singular}].en`))
    if(translation === undefined) {
      return count === 1 ? singular : plural
    }
    return count === 1 ? translation[0] : translation[1]
  }

  npgettext(id, singular, plural, count) {
    const { language, translations } = this.state
    const selector = `${singular} ${id}`
    const translation = get(translations, `[${selector}].${language}`, get(translations, `[${selector}].en`))
    if(translation === undefined) {
      return count === 1 ? singular : plural
    }
    return count === 1 ? translation[0] : translation[1]
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
          language: this.state.language,
        }}
      >
        {this.props.children}
      </TarnslationsContext.Provider>
    )
  }
}

TranslateProvider.defaultProps = defaultProps
TranslateProvider.propTypes = propTypes

export function withTranslations(ChildComponent) {
  return function(props) {
    return (
      <TarnslationsContext.Consumer>
        {({ translations, ...rest }) => (<ChildComponent {...props} {...rest}/>)}
      </TarnslationsContext.Consumer>
    )
  }
}

export function useTranslations() {
  const { translations, ...translationData } = useContext(TarnslationsContext)
  return translationData
}

export const Translator = TarnslationsContext.Consumer

export function gettext(text = '') {
  return (
    <TarnslationsContext.Consumer>
      {({ gettext }) => gettext(text)}
    </TarnslationsContext.Consumer>
  )
}

export function pgettext(id = '', text = '') {
  return (
    <TarnslationsContext.Consumer>
      {({ pgettext }) => pgettext(id, text)}
    </TarnslationsContext.Consumer>
  )
}

export function ngettext(singular = '', plural = '', count) {
  return (
    <TarnslationsContext.Consumer>
      {({ ngettext }) => ngettext(singular, plural, count)}
    </TarnslationsContext.Consumer>
  )
}

export function npgettext(id = '', singular = '', plural = '', count) {
  return (
    <TarnslationsContext.Consumer>
      {({ npgettext }) => npgettext(id, singular, plural, count)}
    </TarnslationsContext.Consumer>
  )
}

export function interpolate(message, obj, named) {
  if(named) {
    return message.replace(/%\(\w+\)s/g, function(match) { return String(obj[match.slice(2, -2)]) })
  } else {
    return message.replace(/%s/g, function(match) { return String(obj.shift()) })
  }
}
