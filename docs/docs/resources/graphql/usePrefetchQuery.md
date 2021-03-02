---
id: usePrefetchQuery
title: usePrefetchQuery
sidebar_label: usePrefetchQuery
---
## ~~usePrefetchQuery~~
```javascript
usePrefetchQuery(query, options)
```
~~usePrefetchQuery~~ is Hook to connect GraphQL data to React component and automatically fetch the data on Component mount. This Hook will also automatically abort request on Component unmount in case request is still pending.

It hase same API as [useQuery](/bones/docs/resources/graphql/usequery) 

## ~~Ussage~~

dogs.graphql
```graphql
query Dogs {
    dogs {
      id
      breed
    }
  }
```

```javascript
import DOGS from './dogs.graphql'
import { usePrefetchQuery } from '@cranium/resource'

function Dogs(){
   const { request, data, isLoading, errors, filters } = usePrefetchQuery(DOGS)({})
   ...
}
```

Or with parameters
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

```javascript
import DOGS from './dogs.graphql'
import { usePrefetchQuery } from '@cranium/resource'

function Dogs(){
   const { request, data, isLoading, errors, filters } = usePrefetchQuery(DOGS, {
        parseValue: 'data.dogs'
   })({ first: 16 })
   ...
}
```