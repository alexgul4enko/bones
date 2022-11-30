---
id: use-resource
title: useResource
sidebar_label: useResource (configs)
---

# useResource

Basic hook for sending REST API from within React Component. 

```ts
useResource( config: ResourceConfig )
```

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
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
        // sync actions
        setData,         // action to change data
        setLoading,      // action to toggle loading flag
        setErrors,       // action to change errors
        setFilters,      // action to change filters
        clear,           // action to delete all resource:  data,isLoading,options,errors,filters
    } = useResource(resourceConfig)
}
```

## namespace

`resource` module uses Redux global state managment. When you call some action for the first time it will create new item in Redux store with key that is equal to `namespace`.

:::caution

Please pay attantion that `namespace` should be some unique miningfull variable. In case you will use same `namespace` for all your configurations it will just override each other

:::

When you first open application Redux store is empty

```js title="redux store"
{}
```

```tsx title="first component to render"
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'myAppData',
}
function APP () {
    const { filters, setData } = useResource(resourceConfig)
    // create myAppData resource on mount
    useEffect(() => setData({ test: 'data' }), [])
    return <User/>
}
```

```js title="redux store"
{
    myAppData: {
        test: 'data'
    }
}
```

```tsx title="second compoent to Render"
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'user',
}
function User () {
    const { filters, setData , setLoading, setErrors, setFilters} = useResource(resourceConfig)
    // create user resource on mount
    useEffect(() => {
        setData({ name: 'Alex' })
        setLoading(true)
        setErrors('no errors')
        setFilters({ some: 'filters' })
    }, [])
}
```


```js {7-16} title="redux store"
{
    myAppData: {
        data: {
            test: 'data'
        }
    },
    user: {
        data: {
            name: 'Alex'
        },
        isLoading: true,
        errors: 'no errors',
        filters: {
            some: 'filters'
        }
    }
}
```

```tsx {14} title="second compoent add clear data"
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'user',
}
function User () {
    const { filters, setData , setLoading, setErrors, setFilters, clear } = useResource(resourceConfig)
    // create user resource on mount
    useEffect(() => {
        setData({ name: 'Alex' })
        setLoading(true)
        setErrors('no errors')
        setFilters({ some: 'filters' })
        return clear
    }, [])
}
```

```js title="redux store"
{
    myAppData: {
        data: {
            test: 'data'
        }
    }
}
```

:::tip

You can use short Synax of Resource config

```js
useResource({ namespace: 'user' })
```
is same as 

```js
useResource('user')
```

:::

## endpoint

Resource configuration to setup API URL so send HHTP requests

### Static url

```tsx {5}
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users'
}
function APP () {
    const { fetch, create } = useResource(resourceConfig)
    // GET /api/users
    useCallback(() => fetch())

    // POST /api/users
    useCallback(() => create())
}
```

:::tip

You can use short Synax of Resource config

```js

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users'
}

useResource(resourceConfig)
```
is same as 

```js
useResource('users')
```

:::

### Dynamic url

```tsx {5}
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users/:deparment/:office?'
}

function APP () {
    const { fetch } = useResource(resourceConfig)
    // GET /api/users/developers
    useCallback(() => fetch({ deparment: 'developers' }))

    // GET /api/users/developers/UK
    useCallback(() => fetch({ deparment: 'developers', office: 'UK' }))
}
```

:::tip

You can use short Synax of Resource config

```js

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users/:deparment/:office?'
}

useResource(resourceConfig)
```
is same as 

```js
useResource('users/:deparment/:office?')
```

:::

## baseURL

By default resource module will automatically appent `/api/` prefix to all endpoints


```tsx {5,9}
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users'
}
function APP () {
    const { fetch, create } = useResource(resourceConfig)
    // GET /api/users
    useCallback(() => fetch())
}
```

To change this behavior use `baseURL` config

```tsx {6,10}
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: 'users',
    baseURL: '/'
}
function APP () {
    const { fetch, create } = useResource(resourceConfig)
    // GET /users
    useCallback(() => fetch())
}
```

## queries

`queries` is an Array of all posible query params that aceepts current endpoint

:::caution

All other params that is not described in `queries` resourceConfig will be omited from queryString

:::

:::note

After each API call `resource` module will store query params from the latest API call in `filters` object

:::

```jsx {6}
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'globalData',
    endpoint: 'context',
    queries: ['accountId', 'keys']
}
function MyReactComponent () {
    const { fetch, create, filters } = useResource(resourceConfig)

    //GET /api/context
    useCallback(() => fetch())

    //GET /api/context?accountId=14
    useCallback(() => fetch({ accountId: 14 }))

    //GET /api/context?accountId=14&keys=PERMISSIONS
    useCallback(() => fetch({ accountId: 14, keys: 'PERMISSIONS' }))

    //GET /api/context?accountId=14&keys=PERMISSIONS,ROLES
    useCallback(() => fetch({ accountId: 14, keys: ['PERMISSIONS', 'ROLES'] }))

    //GET /api/context
    useCallback(() => create({ missed: 'test', price: 0 }))

    return {
        <>
            <p>Filters from latest requests</p>
            <p>{JSON.stringify(filters)}</p>
        </>
    }

}
```

## cache

Cache module configuration to store API data in storage.

For more info, use the [link](/docs/cache/resource-cache)

## transformValue

Function to modify API responce data before passing to React component and caching.

```js {6,7}
import { useResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    // modify API responce before passing props to react and caching
    transformValue: (userData) => ({...userData, fullName: `${userData.fistName} ${userData.lastName}` })
}

function MyComponent() {
    const { data } = useResource(resourceConfig)
}
```


## transformErrors

Function to modify API responce errors before passing to React component

```js {6,7}
import { useResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    // modify API errors before passing it to react component
    transformErrors: (erros) => ({error: erros.message})
}

function MyComponent() {
    const { data } = useResource(resourceConfig)
}
```

## forceUpdates

Default work flow for async actions like (fetch, create, delete, update...) is:

1. Call async action from react Component
2. Set `isLoading` true, save url and query params to `filters`
3. Send HTTP request
4. Save data/errors on respoce, Set `isLoading` false

You can omit changing `isLoading`, `errors` and `filters` data by setting `forceUpdates` to `true`, so that only `data` will be changing.
Most common case for this configuration is when you use some react npm packages to work with form. In most cases that libraries provides it own handles for submitting and errors so that you can use this config for better performance and to avoid dublicated indicators

## reducer

Function that will be called in [redux reducer](https://redux.js.org/basics/reducers). Default `'replace'`.
By default connect resources has already defined 4 types of most reusable reducers.
And you may use it as a String.

Or you can create your own reducer and pass is as a function

```javascript
useResource({ namespace: 'cars', reducer: 'object' })
useResource({ namespace: 'cars', reducer: 'none' })
useResource({ namespace: 'cars', reducer: 'replace' })
useResource({ namespace: 'cars', reducer: 'infinityList' })
useResource({ namespace: 'cars', reducer: myCustomReducer })
```

### `object` reducer

Merge prev state and action payload
```js
function objectReducer(state, action){
  return { ...state, ...action.payload }
}
```

### `none` reducer

Do not change store data
```js
function noneReducer(state, action){
  return state
}
```

### `replace` reducer

Skip store data and use action payload
```js
function replaceReducer(state, action){
  return action.payload
}
```

### `infinityList` reducer
This is the most complex type of reducers that works for endpoint with list data types

```json
{
  "count": 10,
  "results": []
}
```
`infinityList` helpful when you work with infinity List to load next items on scroll to bottom. The basic idea of infinity lists is that when u first enter the page you need to send GET request for first `n` rows and on scroll end send one more request to get next batch of data and join 2 array. Next problem is inline editing.

```js
function infinityListReducer(state, action){
  return {
    ...state,
    ...action.payload,
    results: [...state.results, ...action.payload.results ]
  }
}
```


### custom reducer function

You may create your own logic for reducer. For example:

```js
function myCustomReducer( state, payload ){
  return { ...state, ...payload, count: state.count + 1 }
}
useResource({ namespace: 'cars', reducer: myCustomReducer })
```

:::caution

Creating your own reducer, please pay attention to [Redux Style Guide](https://redux.js.org/style-guide/style-guide)

:::







