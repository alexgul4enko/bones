---
id: use-custom-request
title: useCustomRequest
sidebar_label: useCustomRequest
---
## basic

```ts
useCustomRequest(asyncFunction, resourceConfig)
```
Using `useCustomRequest` you can create your own async function and integare it into `resource` module. And in same time you still can use all other `resource` methods.

**useCustomRequest** accepts 2 arguments:
-  asyncFunction
- [Resource Config](/docs/resources/hooks/use-resource)

```jsx {8-14,30}
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

## Creating async function

:::danger

Note that async function that is passed to `useCustomRequest` should return `Promise`

This will not work:

```js
import { useCustomRequest } from '@cranium/resource'

function myCustomFetch(API, payload, meta, store) {
  return 12
}

useCustomRequest(myCustomFetch, { namespace: 'test' })
```
:::

### API
Instance of [API](/docs/api/api_about). 
:::tip

It is recommended to use [API](/docs/api/api_about) module for sending HTTP request.
API already has global interceptor to handle 401 to logout user, so that you don't need to handle this exception.
API returns special type of Promise that has `cancel` method to terminate request.

```ts
import { API } from '@cranium/api';
import { useCustomRequest } from '@cranium/resource';

function getUsers(api: typeof API) {
  return API.get('users')
}

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users/:uuid'
}

function MyComponent(argument) {
    const { request } = useCustomRequest(getUsers, resourceConfig)
}
```

:::

### payload

Action payload, or params that will be passed to `request` function
```tsx {5,18}
import { API } from '@cranium/api';
import { useCustomRequest } from '@cranium/resource'

function myCustomFetch(api: typeof API, payload, meta, store) {
  console.log(payload) //=> { uuid: 12, name: 'test'}
  return api.get('users/:uuid', { params: payload.uuid }) => //GET /api/users/12
}

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users/:uuid'
}

function MyComponent({ users }) {
    const { request } = useCustomRequest(myCustomFetch, resourceConfig)

    useEffect(() => {
        const request = users.request({ uuid: 12, name: 'test'})
        //abort request on unmount
        return request.cancel
    }, []) 
}

```

### meta

[Resource configuration](/docs/resources/hooks/use-resource) 

```js {5,9-12}
import { API } from '@cranium/api';
import { useCustomRequest } from '@cranium/resource'

function myCustomFetch(api: typeof API, payload, meta, store) {
  console.log(meta) //=> { namespace: 'users', endpoint: 'users/:uuid' }
  return api.get(meta.endpoint, { params: payload.uuid }) => //GET /api/users/12
}

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users/:uuid'
}

function MyComponent({ users }) {
    const { request } = useCustomRequest(myCustomFetch, resourceConfig)

    useEffect(() => {
        const request = users.request({ uuid: 12, name: 'test'})
        //abort request on unmount
        return request.cancel
    }, []) 
}
```

### store
[Redux store](https://redux.js.org/api/store)


## simple syntax
You can define namespace as a String

```js {10}
import { useCustomRequest, makeCancelablePromise } from '@cranium/resource'

function myCustomFetch() {
  return makeCancelablePromise(new Promise( function( resolve, reject ) {
    setTimeout( () => resolve({ success: true }), 1000 )
  }))
}

function MyComponent({ users }) {
    const { request } = useCustomRequest(myCustomFetch, 'users')
}
```

## Aborting requests

### Default API implementation
By, default `API` module already returns Promise with extra method `cancel` that will use AbortController to abort Pending requests.

```tsx {18,19}
import { API } from '@cranium/api';
import { useCustomRequest } from '@cranium/resource'

function myCustomFetch(api: typeof API, payload, meta, store) {
  return api.get('users/:uuid', { params: payload.uuid }) => //GET /api/users/12
}

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users/:uuid'
}

function MyComponent({ users }) {
    const { request } = useCustomRequest(myCustomFetch, resourceConfig)

    useEffect(() => {
        const request = users.request({ uuid: 12, name: 'test'})
        //abort request on unmount
        return request.cancel
    }, []) 
}

```

### Own implementation

In case your async function does not return instance of `API` Request, you will need:

1. create your own instance of `AbortController`
2. pass AbortController `signal` to `API` module
3. Wrap Promise from async function with `makeCancelablePromise`

```tsx {6,8,15,23,28,44}
import { API } from '@cranium/api';
import { useCustomRequest, makeCancelablePromise } from '@cranium/resource'

function myCustomFetch(api: typeof API, payload, meta, store) {
  //create new instance of AbortController
  const controller = new AbortController();
  // wrap your Promise with "makeCancelablePromise" function
  return makeCancelablePromise (
    Promise.all([ 
        api.get(
            'users/:uuid', 
            {
                params: payload.uuid,
                //pass signal to API module
                signal: controller.signal
            }
        ),
        api.get(
            'users/:uuid/cars', 
            {
                params: payload.uuid,
                //pass signal to API module
                signal: controller.signal
            }
        )
    ]),
    //pass controller
    controller
  )
  
}

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users/:uuid'
}

function MyComponent({ users }) {
    const { request } = useCustomRequest(myCustomFetch, resourceConfig)

    useEffect(() => {
        const request = users.request({ uuid: 12, name: 'test'})
        //abort request on unmount
        return request.cancel
    }, []) 
}

```
