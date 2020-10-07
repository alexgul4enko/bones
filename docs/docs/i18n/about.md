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
fucntion APP () {
  return (
    <TranslateProvider
      defaultLanguage="en"
      storage={localStorage}
      url="jsi18n"
      api={api}
    >
        <Provider .../>
    </TranslateProvider>
  )
}
```

## ~~API~~

|  name            |      type  | default          |
|------------------|------------|------------------|
| defaultLanguage  |  String    | 'en'             |
| langKey          |  String    | 'lang'           |
| translationsKey  |  String    | 'translations'   |
| storage          |  Object    | required         |
| url              |  String    | required         |
| api              |  Object    | required         |
| reload           |  Function  |                  |


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

Object for caching data. For more information you can read [here](/frontend-docs/docs/cache/cache_middleware#storage). Or you can create your [own storage](/frontend-docs/docs/cache/cache_middleware#create-own-storage)

### ~~url~~

API endpoint for tranlations.
This is common priciple that you should have an API Endpoint that will return translations in JSON formal like:

```json
{
  "Between places": {
    en: "Between places",
    ru: "в подвешенном состоянии",
  }
}

```

### ~~api~~

Instance of [API](/frontend-docs/docs/api/api_about)

### ~~reload~~

Function that will be used when switching from rtl-ltr to reload page. 
Mostly it will be [Location: reload()](https://developer.mozilla.org/en-US/docs/Web/API/Location/reload) for Web apps.
It is not required function and if you don't need to reload page on switching rtl-ltr, you can skip this option

## ~~gettext(message)~~

Returns the localized translation of message, based on the current language.

```javascript
import { gettext } from '@cranium/i18n'
function Title(props){
    return <h1>{ gettext("Hello") }</h1>
}
```

## ~~pgettext(domain, message)~~

Like gettext(), but looks the message up in the specified domain

```javascript
import { pgettext } from '@cranium/i18n'
function Title(props){
    return <h1>{ pgettext("pageid", "Hello") }</h1>
}
```

## ~~ngettext(singular, plural, n)~~

Like gettext(), but consider plural forms. If a translation is found, apply the plural formula to n, and return the resulting message. If no translation is found, return singular if n is 1; return plural otherwise.

```javascript
import { ngettext } from '@cranium/i18n'
function Title(props){
    return <h1>{ ngettext("Car", "Cars", 2) }</h1>
}
```

## ~~npgettext(domain, singular, plural, n)~~

Like ngettext(), but look the message up in the specified domain.

```javascript
import { npgettext } from '@cranium/i18n'
function Title(props){
    return <h1>{ npgettext("loginPage", "Car", "Cars", 2) }</h1>
}
```

## ~~interpolate(message, config, named)~~

The interpolate function supports dynamically populating a format string.

- Positional interpolation: obj contains a JavaScript Array object whose elements values are then sequentially interpolated in their corresponding fmt placeholders in the same order they appear.
 

```javascript
import { gettext, interpolate } from '@cranium/i18n'
var fmts = gettext('There are %s objects. Remaining: %s')
 interpolate(fmts, [11, 20]) => 'There are 11 objects. Remaining: 20'
```
 
- Named interpolation: This mode is selected by passing the optional boolean named parameter as true. 


```javascript
import { gettext, interpolate } from '@cranium/i18n'
const d = {
    count: 10,
    total: 50
}
var fmts = gettext('There are %(count)s of a total of %(total)s objects')
interpolate(fmts, d, true) => There are 10 of a total of 50 objects
```

## ~~withTranslations (HOC)~~

Hight Order Component to pass transtation props to React component

```javascript
import { withTranslations } from '@cranium/i18n'
function MyComponent({
    gettext,
    pgettext,
    ngettext,
    npgettext,
    setLanguage,
    language
}){
    retrun ...
}

export default withTranslations(MyComponent)
```


## ~~useTranslations (hook)~~

Hook to use transtation in React component

```javascript
import { useTranslations } from '@cranium/i18n'
function MyComponent(){
    const { gettext, pgettext, ngettext, npgettext, setLanguage, language } = useTranslations()
    retrun ...
}
```

## ~~Translator (render props)~~

React component to use tarnslations as Render prop

```javascript
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
