---
id: resource_hooks
title: Hooks
sidebar_label: Hooks
---

## ~~useResource~~

Hook that will create resource. The difference from connectResources is that useResource will only accept single [Resource](/frontend-docs/docs/resources/connect_resources#resource) and return same properties as [connectResources](/frontend-docs/docs/resources/connect_resources#basic-usage)

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
Hook for custom async action
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
  const findLove = useCustomRequest(tryAsync, 'myLove') 
  return <button onClick={()=>findLove()}>Find your love</button>
}
```

## ~~useRequest~~
Hook for async resource action.

```
useRequest(resource, type)
```

### ~~resource~~
[Resource](/frontend-docs/docs/resources/connect_resources#resource) config. Required

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
