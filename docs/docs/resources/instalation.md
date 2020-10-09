---
id: resource_instalation
title: Instalation
sidebar_label: Instalation
---

To use `resource` you need firstly add [Redux](https://redux.js.org/).
Then add following code to init redux store

```javascript
import { promisableActionMiddleware, composeReducers, combineReducers } from '@cranium/redux-helpers'
import { API } from '@cranium/api'
import { QueryParams } from '@cranium/queryparams'

export const QS = new QueryParams()
//configure API module
const api = new API({
  baseURL: '/api/v1/',
  queryFuntion: QS.buildQueryParams,
})

const store = createStore(
  composeReducers(//use composeReducers to have multiple root reducers
    {}, // initial store
    combineReducers(reducers),//add your own reducers
    resourcesReducer, // add reducer for resources
  ),
  {},
  compose(
    applyMiddleware(
      promisableActionMiddleware({ API: api }), //add resource middleware
    )
  )
)
```