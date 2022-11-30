---
id: use-prefetch-resource
title: usePrefetchResource
sidebar_label: usePrefetchResource
---

## basic

```js
usePrefetchResource(resourceConfig, prefetchConfigs)
```
Hook that returns same actions and data as `useResource` hook. In additional `usePrefetchResource` hook will:
- send initial Request on mount
- terminate pending request on unmount
- clear resource on unmount
- returns aditional `initialLoading` indicator

```jsx {27}
import { usePrefetchResource } from '@cranium/resource'

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
        clear,           // action to delete all resource:  data,isLoading,options,errors,filters,
        initialLoading   // boolean to determinate only initial fetch Request
    } = usePrefetchResource(resourceConfig)
}
```

**usePrefetchResource** accepts 2 arguments:
1. resourceConfig. [Resource config](/docs/resources/hooks/use-resource)
2. prefetchConfigs. Additional configurations to customize `prefetch` logic.

:::caution

In case you need to send HTTP request to get data to render Component, we strongly recommend to use `usePrefetchResource` hook. These will cover the most common scenarios and let you avoid duplicating code.

:::

## prefetchConfigs

### filters
Payload to pass to initial API Request


```jsx {27}
import { usePrefetchResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
// no configs defined
// GET /api/users on Mount
function MyReactComponent () {
    const { data } = usePrefetchResource(resourceConfig)
}
```

```jsx {27}
import { usePrefetchResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users/:uuid?',
}

// GET /api/users/33 on Mount
function MyReactComponent () {
    const { data } = usePrefetchResource(resourceConfig, { filters: { uuid: 33 } })
}
```

```jsx {27}
import { usePrefetchResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
    queries: ['offset', 'limit']
}

// GET /api/users?offset=0&limit=10 on Mount
function MyReactComponent () {
    const { data } = usePrefetchResource(resourceConfig, { filters: { offset: 0, limit: 10 } })
}
```

### method
String `GET|POST`. Default `GET`. String configuration to control initial request HTTP Method.
```js
// GET /api/users
import { usePrefetchResource } from '@cranium/resource'

function MyReactComponent () {
  const { data } = usePrefetchResource('users')
}
```
```js
// POST /api/users
import { usePrefetchResource } from '@cranium/resource'

function MyReactComponent () {
  const { data } = usePrefetchResource('users', { method: 'POST' })
}
```

### destroyOnUnmount
`Boolean` flag. Default `true`. Flag to control whenever to delete resource data on component unmount.

In case you need to save Component data even if Component was removed from the dom (in memory cache)

```js
import { usePrefetchResource } from '@cranium/resource'

function MyReactComponent () {
  const { data } = usePrefetchResource('users', { destroyOnUnmount: false })
}
```
