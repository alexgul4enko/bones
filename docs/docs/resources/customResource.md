---
id: resource_customresources
title: Custom Resource
sidebar_label: Custom Resource
---

[connectResource](/docs/resources/connect_resources) will add all possible methods to work with standard REST API.
But what if you need something more then sending 1 HTTP request, what if you have more complex logic?
In this case you may need to use `customresource`


`customresource` is a function that takes 1 argument `async` function and returns modified connectResource function.
**modified** means that you will still have all props that you have with simple `customresource`, but in additional you will have one more async property in your React Component `this.props[namespace].request` that run your custom async action instead of sending 1 HTTP request based on REST.

## Basic usage

```js {20}
import { customResource } from '@cranium/resource'

function myCustomFetch(API, payload, meta, store) {
  return new Promise( function( resolve, reject ) {
    setTimeout( () => resolve({ success: true }), 1000 )
  })
}

const customConnectResource = customResource(myCustomFetch)

function MyReactElement({ users }){
    const {
        // meta data
        data,            // body from success HTTP request
        isLoading,       // boolean flag to determinate async action status
        options,         // body from success OPTIONS HTTP request
        errors,          // error from HTTP request
        filters,         // JSON representation of query string
        // async actions
        request,   // new custom action that will call  myCustomFetch function
        fetch,           // action to send GET HTTP request
        fetchOptions,    // action to send OPTIONS HTTP request
        create,          // action to send POST HTTP request
        replace,         // action to send PUT HTTP request
        update,          // action to send PATCH HTTP request
        remove,          // action to send DELETE HTTP request 
        // sync actions
        setData,         // action to change data
        setLoading,      // action to toggle loading flag
        setErrors,       // action to change errors
        setFilters,      // action to change filters
        clear,           // action to clear current part of redux store
    } = users



}
customConnectResource({ namespace: 'users' })(MyReactElement)

```

## Creating async function

:::danger

Note that async function that is passed to `customResource` should return `Promise`

<span style={{ color: 'red', fontWeight: 'bold' }}>This will not work</span>

```js
import { customResource } from '@cranium/resource'

function myCustomFetch(API, payload, meta, store) {
  return 12
}

const customConnectResource = customResource(myCustomFetch)
```
:::

Function callback accepts 2 arguments:

### API
Instance of [API](/docs/api/api_about). 
:::tip

It is recommended to use [API](/docs/api/api_about) module for sending HTTP request.
API already has global interceptor to handle 401 to logout user, so that you don't need to handle this exception.
API returns special type of Promise that has `cancel` method to terminate request.

```js
function myCustomFetch(API, payload, meta, store) {
  return API.get('users')
}
```
:::

### payload

Action payload, or params that will be passed to `request` function
```js {4,5,12}
import { customResource } from '@cranium/resource'

function myCustomFetch(API, payload, meta, store) {
  console.log(payload) //=> { uuid: 12, name: 'test'}
  return API.get('users/:uuid', { params: payload.uuid }) => //GET /api/users/12
}

const customConnectResource = customResource(myCustomFetch)

function MyComponent({ users }) {
    useEffect(() => {
        users.request({ uuid: 12, name: 'test'})
    }) 

}

export default customConnectResource('users')(MyComponent)
```

### meta

[Resource](/docs/resources/connect_resource_type) configuration

```js {4,5,12}
import { customResource } from '@cranium/resource'

function myCustomFetch(API, payload, meta, store) {
  console.log(meta) //=> { namespace: 'users', endpoint: 'users/:uuid' }
  return API.get(meta.endpoint, { params: payload.uuid }) => //GET /api/users/12
}

const customConnectResource = customResource(myCustomFetch)

function MyComponent({ users }) {
    useEffect(() => {
        users.request({ uuid: 12 })
    }) 

}

export default customConnectResource({ namespace: 'users', endpoint: 'users/:uuid' })(MyComponent)
```

### store
[Redux store](https://redux.js.org/api/store)

## Configure resource

`customresource` function returns same function as [connectResources](/docs/resources/connect_resources). To get the HOC you will need to pass [Resource config](/docs/resources/connect_resource_type)

### simple
You can define namespace as a String

```js
import { customResource } from '@cranium/resource'

function myCustomFetch(API, payload, meta, store) {
  return new Promise( function( resolve, reject ) {
    setTimeout( () => resolve({ success: true }), 1000 )
  })
}

const customConnectResource = customResource(myCustomFetch)

function MyReactElement({ delay }) {

}

customConnectResource('delay')(MyReactElement)

```

### Resource object
You can define namespace as a String

```js
import { customResource } from '@cranium/resource'

function myCustomFetch(API, payload, meta, store) {
  return new Promise( function( resolve, reject ) {
    setTimeout( () => resolve({ success: true }), 1000 )
  })
}

const customConnectResource = customResource(myCustomFetch)

function MyReactElement({ delay }) {

}

customConnectResource({ 
    namespace: 'delay',
    endpoint: 'some-url', 
    queries: ['offset'],
    forceUpdates: false
})(MyReactElement)

```
