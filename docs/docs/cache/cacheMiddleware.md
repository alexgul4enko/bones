---
id: cache_middleware
title: cache middleware
sidebar_label: cache middleware
---

Is [redux middlware](https://redux.js.org/advanced/middleware) that will:

1. Initialize redux store from cache on application start up 
2. cache redux store data


## ~~API~~

```javascript
cacheMiddleware({
  storeKey: 'app_name',
  cacheKeys: ['user'],
  storage: localStorage,
})
```

### ~~storeKey~~
This is key that could be internally used by storage. 
For example if you are using [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
Than it will be `keyName` in [Storage.setItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)

:::tip

You can use `process.env.STORAGE_KEY` from .end file

:::

### ~~cacheKeys~~

Is an optional Array<String\> where you can define a parts of your Redux store that you want to cache

:::tip

You can use `JSON.parse(process.env.CACHE_STATE_KEYS)` from .end file

:::

:::caution

Please do not cache any user sensitive data such as authorization token or biling info to localStorage

:::

### ~~storage~~

Object that will cache data. In general you can use [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [AsyncStorage](https://github.com/react-native-community/async-storage).

## ~~create own storage~~

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

## ~~CheckCache~~

React Component that will not render your app while store initializating from cache.  You should wrap your application with this component in root Component

```jsx
import { CheckCache } from '@cranium/cache'

function App({ store, history }) {
  return (
    <Provider store={store}>
      <CheckCache>
        <Router history={history} routes={routes}/>
      </CheckCache>
    </Provider>
  )
}
```
