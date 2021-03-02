---
id: usequery
title: useQuery
sidebar_label: useQuery
---

## ~~useQuery~~

```javascript
useQuery(query, options)
```

### ~~query~~
GraphQL query 

Queries could be defined in several ways: 

1. Using `@apollo/client`
```
import { gql } from '@apollo/client';

const GET_DOGS = gql`
  query Dogs {
    dogs {
      id
      breed
    }
  }
`;
```

2. using babel plugin `import-graphql`

babel.config.js
```javascript
{
    plugins: ['import-graphql']
}
```
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
import { useQuery } from '@cranium/resource'

function Dogs(){
   const { request, data, isLoading, errors, filters } = useQuery(DOGS)
   ...
}
```

### ~~options~~

Object with additional configurations

|  Property          |      type             |
| -------------------| --------------------- |
|   reducer          | string|fucntion       |
|   namespace        | string                |
|   forceUpdates     | boolean               |
|  destroyOnUnmount  | boolean               |
|   queries          | Array[String]         |
|   parseErrors      | string or function    |
|   parseValue       | string or function    |

So in general it has same configs as [ConnectResources](/bones/docs/resources/connect_resources#resource) 
#### ~~namespace~~ 
By default namespace will be used as query name (camellCased) 
```graphql
query Dogs {
    dogs {
      id
      breed
    }
  }
```

In this case `namespace` is ~~dogs~~
#### ~~queries~~
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

#### ~~parseValue~~
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
GraphQl responce in most cases has lot of nestings. To make data more simple, you can use parseValue option.
In case ~~parseValue~~ is ~~String~~ it will just use `lodash.get``` function to remove root nesting from graphQL responce
```javascript
import DOGS from './dogs.graphql'
import { useQuery } from '@cranium/resource'

function Dogs(){
   const { request, data } = useQuery(DOGS, {parseValue: 'data.dogs'})
   ...
}
```
Or you can provide whatever your custom function to transform responce

#### ~~parseErrors~~
~~parseErrors~~ has same API as ~~parseValue~~. And this function executes before ~~parseValue~~. It could be string or functoin and in general it is needed to convert GraphQL responce (that is always success) to error. This function could be usefull while working with forms.





