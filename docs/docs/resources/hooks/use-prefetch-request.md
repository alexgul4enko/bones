---
id: use-prefetch-request
title: usePrefetchRequest
sidebar_label: usePrefetchRequest
---

```
usePrefetchRequest(asyncFunctoin, resourceConfig, prefetchConfigs)
```
Hook that returns same actions and data as `useCustomRequest` hook. In additional `usePrefetchRequest` hook will:
- send initial Request on mount
- terminate pending request on unmount
- clear resource data on unmount

**usePrefetchRequest** accepts 3 arguments:
- asyncFunction. To read more about async function visit [link](/docs/resources/hooks/use-custom-request#creating-async-function)
- [Resource Config](/docs/resources/hooks/use-resource)
- prefetchConfigs. Configuration object to configure initial Request. This configurations are same as for [`usePrefetchResource` hook](/docs/resources/hooks/use-prefetch-resource#prefetchconfigs).


```jsx {19,27}
import { useCustomRequest } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}

function myAsyncFunction(API, payload, meta) {
  return API.put('/test',{})
}

function MyReactComponent () {
    const {
        data,            // body from success HTTP request
        isLoading,       // boolean flag that fill be automatically toggle while using fetch|fetchOptions|create|update|remove actions
        options,         // body from success OPTIONS HTTP request
        errors,          // errors from HTTP request
        filters,         // JSON representation of query string
        initialLoading,   // boolean to determinate only initial fetch Request
        // async actions
        fetch,           // action to send GET HTTP request
        fetchOptions,    // action to send OPTIONS HTTP request
        create,          // action to send POST HTTP request
        replace,         // action to send PUT HTTP request
        update,          // action to send PATCH HTTP request
        remove,          // action to send DELETE HTTP request 
        request          // action that will call your own Async function with same flow as all previous actions
        // sync actions
        setData,         // action to change data
        setLoading,      // action to toggle loading flag
        setErrors,       // action to change errors
        setFilters,      // action to change filters
        clear,           // action to delete all resource:  data,isLoading,options,errors,filters,
    } = useCustomRequest(myAsyncFunction, resourceConfig)
}
```

This code will automatically call `tryAsync` function on mount, toggle loading state, and save data from API `/users` in Redux store.
On component unmount it will terminate pending request and clear `users` data in Redux.