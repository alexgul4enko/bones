---
id: resource_navigationToProps
title: navigationToProps
sidebar_label: navigationToProps
---

Simple HOC that will just get all navigation state and pass is to props. Additionally it will parse query string and pass it to props.


## ~~API~~

```
navigationToProps(parseQueryParams)
```

parseQueryParams function not Required. By default it will use  parseQueryParams from [queryParams](/frontend-docs/docs/queryParams/queryParams_about)

```javascript
navigationToProps()(MyReactElemt)
```

Example to prefetch data based on query string in browser url.

for example u have a url `users/list/?offset=20&limit=20&search=ma`


```javascript
import { navigationToProps, prefetchResources } from '@cranium/resource'
import compose from 'redux'

export default compose(
  navigationToProps(),
  prefetchResources({
    endpoint: 'users',
    namespace: 'users',
    queries: ['offset', 'limit', 'search']
  })

)
```