---
id: i18n_crowdin
title: Integration with Crowdin
sidebar_label: Integration with Crowdin
---

![crowdin](/bones/img/crowdin.png)

There are few steps to integrate with Crowdin:

## 1. Extract string from Code

To  extract string from code you can use [react-gettext-parser](https://www.npmjs.com/package/react-gettext-parser)

```js title="extractStrings.js"

const { extractMessagesFromGlob } = require ('react-gettext-parser')


const fs = require('fs')
const messages = extractMessagesFromGlob(['src/**/{*.js,*.jsx,*.ts,*.tsx}'], {
      funcArgumentsMap: {
          gettext: ['msgid'],
          pgettext: ['msgctxt', 'msgid'],
          ngettext: ['msgid', 'msgid_plural'],
          npgettext: ['msgctxt', 'msgid_plural', 'msgid'],
      }
});

const msg = messages.reduce((res,msg)=>{
    const transl = msg.msgid_plural ? {
        [msg.msgid]: msg.msgctxt || msg.msgid,
        [`${msg.msgid}_other`]: msg.msgid_plural
    } : {
         [msg.msgid]: msg.msgctxt || msg.msgid,
    }
    return {
        ...res,
        ...transl
    }
},{})


fs.writeFileSync( './translations.json', JSON.stringify(msg,null, 2))
```

## 2. Configure Crowdin 

To configure Crowdin you need to create ~~crowdin.yml~~ file.
You can read more [here](https://developer.crowdin.com/configuration-file/)

```yaml title="crowdin.yml"
"project_id": "your project id"
"api_token": "your api token"
"base_path": "."                        # path to your project directory on a local machine
"base_url": "https://api.crowdin.com"       # https://{organization-name}.crowdin.com for Crowdin Enterprise
"preserve_hierarchy": true

"files": [
  {
      "source": "translations.json",   
      "translation": "/trans_%two_letters_code%.json",
      "type": "i18next_json"   # set i18next_json format
  },
]

```

## 3. Publish your files to Crowdin

```js title="extractStrings.js" {2,30}
const { extractMessagesFromGlob } = require ('react-gettext-parser')
const { spawnSync } = require('child_process')

const fs = require('fs')
const messages = extractMessagesFromGlob(['src/**/{*.js,*.jsx,*.ts,*.tsx}'], {
      funcArgumentsMap: {
          gettext: ['msgid'],
          pgettext: ['msgctxt', 'msgid'],
          ngettext: ['msgid', 'msgid_plural'],
          npgettext: ['msgctxt', 'msgid_plural', 'msgid'],
      }
});

const msg = messages.reduce((res,msg)=>{
    const transl = msg.msgid_plural ? {
        [msg.msgid]: msg.msgctxt || msg.msgid,
        [`${msg.msgid}_other`]: msg.msgid_plural
    } : {
         [msg.msgid]: msg.msgctxt || msg.msgid,
    }
    return {
        ...res,
        ...transl
    }
},{})


fs.writeFileSync( './translations.json', JSON.stringify(msg,null, 2))

spawnSync('npx', ['crowdin', 'upload', 'sources'], { stdio: 'inherit' })
```

## 4. Setup Client integration

```tsx
import { TranslateProvider } from '@cranium/i18n'
import otaClient from '@crowdin/ota-client';

const client = new otaClient('your hash');

function getTranslation(lang?:string) {
  return client.getStringsByLocale(undefined, lang)
}

const MyApp: FC = ({ children }) => {
  return (
    <TranslateProvider
      storage={localStorage}
      langKey='lang'
      translationsKey='translations'
      getTranslation={getTranslation}
      defaultLanguage={window.navigator.language}
      monoLanguageJSON
    >
      {children}
   </TranslateProvider>
  );
}

```

## Setup in-app translations

```tsx
import { TranslateProvider } from '@cranium/i18n'
import otaClient from '@crowdin/ota-client';

const client = new otaClient('your hash');

function getTranslation(lang?:string) {
  return client.getStringsByLocale(undefined, lang)
}

const isInApp =  window.localStorage.getItem('in-app') === 'true'

const MyApp: FC = ({ children }) => {
  return (
    <TranslateProvider
      storage={localStorage}
      langKey='lang'
      translationsKey='translations'
      getTranslation={getTranslation}
      defaultLanguage={isInApp ? 'ach' : window.navigator.language}
      useDefaultLanguage={isInApp}
      monoLanguageJSON
    >
      <InAppTranslate/>
      {children}
   </TranslateProvider>
  );
}

//init in-app translations
if(isInApp) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', '//cdn.crowdin.com/jipt/jipt.js')
  //@ts-ignore sd
  window._jipt = []
  //@ts-ignore sd
  window._jipt.push(['project', 'asdasdw']);
  document.head.appendChild(script)
}

//Component to toggle in-app translations
export const InAppTranslate:FC = () => {
  const handleChange = useCallback(()=>{
    window.localStorage.setItem('in-app', !isInApp ? 'true' : 'false')
    window.location.reload()
  },[])
  
  return (
    <Switch onChange={handleChange} defaultChecked={isInApp} />
  )
}

```