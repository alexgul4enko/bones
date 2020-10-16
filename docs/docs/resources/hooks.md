---
id: resource_hooks
title: Hooks
sidebar_label: Hooks
---

## ~~useResource~~

Hook that will create resource. The difference from connectResources is that useResource will only accept single [Resource](/bones/docs/resources/connect_resources#resource) and return same properties as [connectResources](/bones/docs/resources/connect_resources#basic-usage)

```javascript
import { useResource } from '@cranium/resource'

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = useResource('users/me')
  useEffect(()=>{
    const request = fetch() //get data on mount
    return request.cancel //terminate request on unmount
  }, [])
  if(isLoading) {
    return 'Loading...'
  }
  if(errors){
    return 'Oooops something went wrong please contact local police office'
  }
  return <UserElement user={data}/>
}
```

## ~~useCustomRequest~~
Hook to use custom async fucntion. 
```
useCustomRequest(asyncFunction, namespace)
```

```javascript
import { useCustomRequest } from '@cranium/resource'

function tryAsync(API, payload, meta) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ love: 'React' })
    }, 1000)
  })
}


function MyReactComponent () {
  const { data, isLoading,  errors, request } = useCustomRequest(tryAsync, 'myLove') 
  return <button onClick={()=>request()}>Find your love</button>
}
```

## ~~usePrefetchResource~~
Same as useResource but it will automatically send request on mount and terminate pending requests on unmount. Also by default it will clear redux store for particular resource on component unmount.

```
usePrefetchResource(resource, configs)
```

### ~~resource~~
[Resource](/bones/docs/resources/connect_resources#resource) config. Required

### ~~configs [Object]~~
- configs.filters [Object]. Filters to pass as an argument to prefetch request
- configs.method ("GET" | "POST")
- configs.destroyOnUnmount [Boolean]. Default true. Flag to clear resource on unmount


```jsx
import { usePrefetchResource } from '@cranium/resource'

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = usePrefetchResource('users/me')
  return <UserElement user={data}/>
}
```

## ~~usePrefetchRequest~~
Same as usePrefetchResource in case u need to provide some custom async function on load Component

```
usePrefetchRequest(asyncFunction, resource, configs)
```

### ~~asyncFunction~~
[Function] Required. Function that will be invoced on component mount. This function should return Promise. See ~~useCustomRequest~~ for more details


### ~~resource~~
[Resource](/bones/docs/resources/connect_resources#resource) config. Required

### ~~configs [Object]~~
- configs.filters [Object]. Filters to pass as an argument to prefetch request
- configs.method ("GET" | "POST")
- configs.destroyOnUnmount [Boolean]. Default true. Flag to clear resource on unmount


```jsx
import { usePrefetchRequest } from '@cranium/resource'

function request(API, data, { endpoint, signal }) {
  return API.get('profile/me', { signal })
}

function MyReactComponent () {
  const { data, isLoading,  errors, request } = usePrefetchRequest('users/me')
  return <UserElement user={data}/>
}
```



## ~~useRequest~~
Hook for async resource action.

```
useRequest(resource, type)
```

### ~~resource~~
[Resource](/bones/docs/resources/connect_resources#resource) config. Required

### ~~type~~

HTTP request type.  Default GET
- GET
- POST
- PUT
- DELETE
- PATCH
- UPDATE
...

```javascript
import { useRequest } from '@cranium/resource'

function MyReactComponent () {
  const fetchUser = useRequest({ endpoint: 'users/me', namespace: 'session'}) 
  return <button onClick={()=>fetchUser()}>Refresh profile</button>
}
```


## ~~useSetData~~

Hook that will return resource setData action `useSetData(namespace)`

```javascript
import { useSetData } from '@cranium/resource'

function MyReactComponent () {
  const setData = useSetData('session') 
  return <button onClick={()=>setData(null)}>clear data</button>
}
```


## ~~useSetErrors~~

Hook that will return resource setErrors action `useSetErrors(namespace)`

```javascript
import { useSetErrors } from '@cranium/resource'

function MyReactComponent () {
  const setErrors = useSetErrors('session') 
  return <button onClick={()=>setErrors(null)}>clear errors</button>
}
```

## ~~useSetFilters~~

Hook that will return resource setFilters action `useSetFilters(namespace)`

```javascript
import { useSetFilters } from '@cranium/resource'

function MyReactComponent () {
  const setFilters = useSetFilters('session') 
  return <button onClick={()=>setFilters({ offset: 2 })}>setFilters</button>
}
```

## ~~useSetLoading~~

Hook that will return resource setLoading action `useSetLoading(namespace)`

```javascript
import { useSetLoading } from '@cranium/resource'

function MyReactComponent () {
  const setLoading = useSetLoading('session') 
  return <button onClick={setLoading}>toggle loading</button>
}
```


## ~~useClear~~

Hook that will return resource clear action `useClear(namespace)`

```javascript
import { useClear } from '@cranium/resource'

function MyReactComponent () {
  const clear = useClear('session') 
  return <button onClick={clear}>Log out</button>
}
```
## ~~useSearch~~

Hook that will create search fucntion.
1. debounce
2. terminate previous request before sending new request
3. terminate request on unmount
```javascript
import { useSearch } from '@cranium/resource'

useSearch(searchFunction, timeout)
```

```jsx
import { useResource, useSearch } from '@cranium/resource'

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = useResource('users/me')
  const search = useSearch(fetch)
  return <SearchInput search={search}/>
}
```

