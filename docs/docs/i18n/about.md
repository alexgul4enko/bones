---
id: i18n_about
title: i18n
sidebar_label: i18n
---

Lightweight simple translation module for React apps based on [gettext](https://www.gnu.org/software/gettext/)


## ~~Ussage~~

## ~~TranslateProvider~~

```jsx
import { TranslateProvider } from '@cranium/i18n'

function APP () {
  return (
    <TranslateProvider
      defaultLanguage="en"
      storage={window.localStorage}
      getTranslation={getTranslations}
    >
        <MyApp />
    </TranslateProvider>
  )
}
```

## ~~API~~

|  name              |      type  | default          |
|--------------------|------------|------------------|
| defaultLanguage    |  String    | 'en'             |
| langKey            |  String    | 'lang'           |
| translationsKey    |  String    | 'translations'   |
| storage            |  Object    | required         |
| reload             |  Function  |                  |
| useDefaultLanguage |  Boolean   |  false           |
| monoLanguageJSON   |  Boolean   |  false           |
| getTranslation     |  Function  |  required        |
| defaultTranslations |  Object   |  {}              |



### ~~defaultLanguage~~

Default language code that will be used when app opened at first time. You can check possible variants [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

:::tip

You can use [navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language)

:::

### ~~langKey~~

This is key that could be internally used by storage to cache user preferred language. 
For example if you are using [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
Than it will be `keyName` in [Storage.setItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)

### ~~translationsKey~~

This is key that could be internally used by storage to cache remote translations. 
For example if you are using [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
Than it will be `keyName` in [Storage.setItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)

### ~~storage(required)~~

Object that will cache data. In general you can use [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [AsyncStorage](https://github.com/react-native-community/async-storage).

#### ~~create own storage~~

```java
class OwnStorage {
  constructor(){
    this.store = new Map()
  }
  getItem(key){
    return this.store.get(key)
  }
  setItem(key, value){
    this.store.set(key, value)
  }
}
```

### ~~reload~~

Function that will be used when switching from rtl-ltr to reload page. 
Mostly it will be [Location: reload()](https://developer.mozilla.org/en-US/docs/Web/API/Location/reload) for Web apps.
It is not required function and if you don't need to reload page on switching rtl-ltr, you can skip this option

### ~~useDefaultLanguage~~

Boolean flag to make Provider use default lang code instead of user selected.
It could be use for example using Crowdin in app translations

```jsx
import { TranslateProvider } from '@cranium/i18n'

function APP () {
  return (
    <TranslateProvider
      defaultLanguage="ach"
      storage={window.localStorage}
      getTranslation={getTranslations}
      useDefaultLanguage
    >
        <MyApp />
    </TranslateProvider>
  )
}
```
### ~~monoLanguageJSON~~

If `getTranslation` function return all languages at once than it should be `true`. Otherwise if `getTranslation` returns translation by each language separatelly, use `false`

### ~~defaultTranslations~~

Object with default translations pairs that will be used only on first load.

### ~~getTranslation~~

Function to load translations.

It could resolve all languages at once
```js
function loadLanguages() {
    return Promise.resolve({
        en: {
            'key': 'value'
        },
        uk: {
            'key': 'value'
        }
    })
}
```

Or by language 

```ts
function loadLanguages(lang: string) {
    return Promise.resolve({
        'key': 'value'
    })
}
```

Please use i18n JSON format
```json
{
  "key": "value",
  "keyDeep": {
    "inner": "value"
  },
  "keyNesting": "reuse $t(keyDeep.inner)",
  "keyInterpolate": "replace this {{value}}",
  "keyInterpolateUnescaped": "replace this {{- value}}",
  "keyInterpolateWithFormatting": "replace this {{value, format}}",
  "keyContext_male": "the male variant",
  "keyContext_female": "the female variant",
  "keyPluralSimple_one": "the singular",
  "keyPluralSimple_other": "the plural",
  "keyPluralMultipleEgArabic_zero": "the plural form 0",
  "keyPluralMultipleEgArabic_one": "the plural form 1",
  "keyPluralMultipleEgArabic_two": "the plural form 2",
  "keyPluralMultipleEgArabic_few": "the plural form 3",
  "keyPluralMultipleEgArabic_many": "the plural form 4",
  "keyPluralMultipleEgArabic_other": "the plural form 5",
  "keyWithArrayValue": ["multipe", "things"],
  "keyWithObjectValue": { "valueA": "return this with valueB", "valueB": "more text" }
}
```

## ~~gettext(message, data)~~

Returns the localized translation of message, based on the current language.

```jsx
import { gettext } from '@cranium/i18n'
function Title(props){
    return (
        <>
            <h1>{gettext("Hello")}</h1>
            <h1>{gettext("Hello %(name)", { name: 'Alex' })}</h1>
        </>
    )
}
```

## ~~pgettext(message, domain, data)~~

Like gettext(), but looks the message up in the specified domain

```jsx
import { pgettext } from '@cranium/i18n'
function Title(props){
    return (
        <>
            <h1>{pgettext("Hello", "pageid")}</h1>
            <h1>{pgettext("Hello %(name)", "pageid", { name: 'Alex' })}</h1>
        </>
    )
}
```

## ~~ngettext(singular, plural, n)~~

Like gettext(), but consider plural forms. If a translation is found, apply the plural formula to n, and return the resulting message. If no translation is found, return singular if n is 1; return plural otherwise.

```jsx
import { ngettext } from '@cranium/i18n'
function Title(props){
    return (
        <>
            <h1>{ngettext("Car", "Cars")}</h1>
            <h1>{ngettext("%(count) Car", "%(count) Cars", { count: 1 })}</h1>
        </>
    )
}
```

## ~~npgettext( singular, plural, domain, n)~~

Like ngettext(), but look the message up in the specified domain.

```jsx
import { npgettext } from '@cranium/i18n'
function Title(props){
   return (
        <>
            <h1>{npgettext("Car", "Cars", "pageid")}</h1>
            <h1>{npgettext("%(count) Car", "%(count) Cars", "pageid", { count: 1 })}</h1>
        </>
    )
}
```

## ~~useTranslations (hook)~~

Hook to use transtation in React component

```jsx
import { useTranslations } from '@cranium/i18n'
function MyComponent(){
    const { gettext, pgettext, ngettext, npgettext, setLanguage, language } = useTranslations()
    retrun ...
}
```

## ~~Translator (render props)~~

React component to use tarnslations as Render prop

```jsx
import { Translator } from '@cranium/i18n'
function MyComponent(){
    retrun (
        <Translator>
            {({ gettext, pgettext, ngettext, npgettext, setLanguage, language })=>{
                return <SomeJSX/>
            }
        </Translator>
    )
}
```

## ~~useGetLanguage~~

Hook that return current language

```jsx
import { useGetLanguage } from '@cranium/i18n'
function MyComponent(){
    const lanf = useGetLanguage()
}
```

## ~~useSetLanguage~~

Hook that function to change language

```jsx
import { useSetLanguage } from '@cranium/i18n'
function MyComponent(){
    const setLanguage = useSetLanguage()
}
```

## ~~useGettext~~

Hook that returns gettetxt useGettetxt function

```jsx
import { useGettext } from '@cranium/i18n'
function MyComponent(){
    const { gettext } = useGettext()
}
```

## ~~usePGettext~~

Hook that returns pgettetxt usePGettetxt function

```jsx
import { usePGettext } from '@cranium/i18n'
function MyComponent(){
    const { pgettext } = usePGettext()
}
```

## ~~useNGettext~~

Hook that returns ngettetxt useNGettetxt function

```jsx
import { useNGettext } from '@cranium/i18n'
function MyComponent(){
    const { ngettext } = useNGettext()
}
```

## ~~useNPGettext~~

Hook that returns npgettetxt useNPGettetxt function

```jsx
import { useNPGettext } from '@cranium/i18n'
function MyComponent(){
    const { npgettext } = useNPGettext()
}
```