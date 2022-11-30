---
id: usePrefetchQuery
title: usePrefetchQuery
sidebar_label: usePrefetchQuery
---
```js
usePrefetchQuery(query, options)(filters)
```
**usePrefetchQuery**  Hook to connect GraphQL data to React component and automatically fetch the data on Component mount. This Hook will also automatically abort request on Component unmount in case request is still pending

It has same API as [useQuery](/docs/resources/graphql/usequery)


```graphql title="dogs.graphql"
query Dogs {
    dogs {
      id
      breed
    }
  }
```

```js
import DOGS from './dogs.graphql'
import { usePrefetchQuery } from '@cranium/resource'

function Dogs(){
   const { request, data, isLoading, errors, filters } = usePrefetchQuery(DOGS)({})
   ...
}
```

```graphql
query Dogs ($first: Int, $cursor: String ) {
    dogs {
        edges {
            node {
                id
                breed 
            }
        }
    }
  }
```

```js
import DOGS from './dogs.graphql'
import { usePrefetchQuery } from '@cranium/resource'

function Dogs(){
   const { request, data, isLoading, errors, filters } = usePrefetchQuery(DOGS, {
        parseValue: 'data.dogs'
   })({ first: 16 })
   ...
}
```