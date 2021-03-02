---
id: useGraphInifnyList
title: useGraphInifnyList
sidebar_label: useGraphInifnyList
---

## ~~useGraphInifnyList~~
~~useGraphInifnyList~~ is Hook to work with infinityList like FlatList in React-Native or window-scroller in web.

## ~~API~~

```javascript
useGraphInifnyList(graphtResource)
```
Returns additional methods 
- ~~loadNext~~
- ~~refresh~~

And Boolean flag ~~isRefreshing~~

This Hook is recomended to use with infinity List, while it will implement in additional some logic like:
- terminate API request on unmount
- terminate load next requests on refresh
- check if list has more data to load
- do not load next pages while previous are not loaded
```graphql
query PRODUCTS ($first: Int, $cursor: String){
  products(first: $first, after: $cursor) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        }
      }
    }
  }

```
```javascript
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'

function Products() {
  const products = usePrefetchQuery(PRODUCTS, { parseValue: 'data.products' })({ first: 16 })
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(products)
  
}

```

:::caution

*useGraphInifnyList* will only work if your graphQL  pagination that works based on `pageInfo.endCursor`  `pageInfo.hasNextPage` and `first`  `after` properties.

Also do not forget to add `pageInfo` to schema definition and do not remove this values in `parseValue` function
:::

~~useGraphInifnyList~~ will automatically concatenate your `edges` on ~~loadNext~~  and refresh all data on ~~refresh~~. So basically do not do anything else to make it work)))

