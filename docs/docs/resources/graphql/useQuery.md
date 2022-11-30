---
id: usequery
title: useQuery
sidebar_label: useQuery
---

**useQuery** hook to send GraphQL request

```js
useQuery(query, options)
```

## query
GraphQL query 

To define GraphQL query create `graphql` file.

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
import { useQuery } from '@cranium/resource'

function Dogs(){
   const { request, data, isLoading, errors, filters } = useQuery(DOGS)
}
```

## options

Object with additional configurations

|  Property          |      type             |
| -------------------| --------------------- |
|   reducer          | string|function       |
|   namespace        | string                |
|   forceUpdates     | boolean               |
|   destroyOnUnmount | boolean               |
|   queries          | Array[String]         |
|   parseErrors      | string or function    |
|   parseValue       | string or function    |

### reducer 
Function that will be called in redux reducer. Default 'replace'. By default connect resources has already defined 4 types of most reusable reducers. And you may use it as a String. [More info](/docs/resources/connect_resource_type#reducer)

```js
import DOGS from './dogs.graphql'
import { useQuery } from '@cranium/resource'

function Dogs(){
   const { request, data, isLoading, errors, filters } = useQuery(DOGS, { reducer: 'none' })
}
````

### namespace
By default namespace will be used as query name (camellCased) 
```graphql
query Dogs {
    dogs {
      id
      breed
    }
  }
```

In this case `namespace` is `dogs`


### queries
By default queries will be automatically generated from graphql
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

In this case it will automatically generate `queries` as `["first","cursor"]`. And then you can use this values from `filters`

### parseValue
In case 
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
GraphQl response in most cases has lot of nesting. To make data more simple, you can use parseValue option.
In case `parseValue` is `String` it will just use `lodash.get` function to remove root nesting from graphQL response
```js
import DOGS from './dogs.graphql'
import { useQuery } from '@cranium/resource'

function Dogs(){
   const { request, data } = useQuery(DOGS, {parseValue: 'data.dogs'})
   ...
}

function Dogs(){
   const { request, data } = useQuery(DOGS, {parseValue: (resp=> get(resp, 'data.dogs.edges'))})
   ...
}
```

### parseErrors
`parseErrors` has same API as `parseValue`. And this function executes before `parseValue`. It could be string or function and in general it is needed to convert GraphQL response (that is always success) to error. This function could be useful while working with forms.

```js
import DOGS from './dogs.graphql'
import { useQuery } from '@cranium/resource'

function parseErrors (data) {
  if(has(data, 'data.errors')) {
    return get(data, 'data.errors.edges')
  }
} 

function Dogs(){
   const { request, data } = useQuery(DOGS, { parseErrors })
   ...
}
```
