---
id: cache_reducer
title: persist reducer
sidebar_label: persist reducer
---

Hight order [redux reducer](https://redux.js.org/basics/reducers) that has only 2 possible [actions](https://redux.js.org/basics/actions)

## ~~Usage~~

```javascript
import { persistReducer } from '@ds-frontend/cache'
import { composeReducers } from '@ds-frontend/redux-helpers'
import { combineReducers } from 'redux'
    
composeReducers(
    {},
    combineReducers({
      users,
      casrs,
    }),
    persistReducer(JSON.parse(process.env.CACHE_STATE_PERSIST_KEYS)),
)
```


## ~~API~~

```javascript
persistReducer(persistKeys)
```

~~persistKeys~~ is an optional Array<String\>. Than mean that this data should not be deleted after `RESET_STORE` action.

:::tip

You can use `CACHE_STATE_PERSIST_KEYS` from .end file

:::

## ~~Actions~~

### ~~INIT_STORE~~
This is [redux action](https://redux.js.org/basics/actions) that will be trigerred automatically when redux store will be initialized from cache.

:::note

This is automatical action you should not be worry to call this action by your own. cacheMiddleware will take care to get data from store on your app initialized state and call this action when data will be retrived. This is common case for React-Native apps where [AsyncStorage](https://github.com/react-native-community/async-storage) has async API

:::

### ~~RESET_STORE~~

This is [redux action](https://redux.js.org/basics/actions) that will clear all redux store exept ~~persistKeys~~. 
This is most common action on logout

```javascript
import { reset } from '@ds-frontend/cache'
import { connect } from 'react-redux'

function LogoutButton({ reset }){
  return (
    <button onClick={reset}>
      Logout
    </button>
  )
}

export default connect(null, { reset })(LogoutButton)
```

