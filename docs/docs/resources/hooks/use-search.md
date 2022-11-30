---
id: use-search
title: useSearch
sidebar_label: useSearch
---

Hook that implements `search` flow:
1. debounce http request
2. terminate previous request before sending new request
3. terminate request on unmount

```ts
useSearch(searchFunction, timeout)
```

Accepts 2 arguments:
- searchFunction. Async resource action or function that return Api request method
- debounce timeout. Default `200`

```js {9,14}
import { useResource, useSearch } from '@cranium/resource'

const resourceConfig = { 
    namespace: 'users', 
    queries: ['search']
}

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = useResource(resourceConfig)
  const search = useSearch(fetch)
  return <input 
    onChange={(e)=>{
      //GET /api/users?search=<input value>
      search({ search: e.target.value })
    }}
  />
}
```


```js {9,13-14}
import { useResource, useSearch } from '@cranium/resource'

const resourceConfig = { 
    namespace: 'users', 
    queries: ['search']
}

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = useResource(resourceConfig)
  const search = useSearch(fetch)
  const handleChange = ((e)=>{
    const value = e.target.value
    search({ search: e.target.value })
        .then(()=>window.history.pushState())
  },[])
  return <input onChange={handleChange}/>
}
```