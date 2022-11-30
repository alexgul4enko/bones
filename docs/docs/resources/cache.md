---
id: resources_cache
title: Cache
sidebar_label: Cache
---

Resources module provides easy way to cache your async data.

The workflow for caching is:

1. Pass data from storage to component
2. Send HTTP request
3. Update storage and React Component

## Cache config

Resource config acceps `cache` config to make it easy to configure caching data.

```ts
    {
        cache: {
            storage: localStorage | sessionStorage;
            refresh?: boolean;
            key: string | (globalData: CacheGlobalData, namespace: string, resourceConfig, actoinPayload) => string
        }
    }
```

## storage

You can choose what storage to use `localStorage` or `sessionStorage`

### localStorage

Send `/api/users/me` HTTP request and cache data in `localStorage`

```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: 'localStorage', key: 'profile' }
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```
### sessionStorage
Send `/api/users/me` HTTP request and cache data in `sessionStorage`

```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: sessionStorage, key: 'profile' }
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```

## refresh

Boolean optional configuration.

By default, `Resources` module will always send HTTP request to refresh cache data.
To make data static and disable refreshing make this option `false`.
In this case, API request the data will be fetched only once.

```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: sessionStorage, key: 'profile', refresh: false }
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```

## key

You can configure a key in Storage to cache data with `key` config

### Static key

Save data localStorage with `profile` key
```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile' }
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```

:::info
  This configuration will store API data in `localStorage` under `profile` key.
  ```
  profile: '<profile_data>'
  ```
:::

### Empty key

In case there is no `key` config, resources module will use `namepace` as a cache key
```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: 'localStorage' }
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```

:::info
  This configuration will store API data in `localStorage` under `profile` key.
  ```
  profile: '<profile_data>'
  ```
:::

```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: '/:accountId/favorite-workspaces',
    cache: { storage: localStorage }
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```

:::info
  This configuration will store API data in `localStorage` under camelCased `namespace` without dynamic paths.
  ```
  favoriteWorkspaces: '<profile_data>'
  ```
:::



### Custom cache key

You can pass a function to `key` config to generate custom Storage key

```ts
import { usePrefetchResource } from '@cranium/resource';

function key() {
    return 'my-key'
}

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: key }
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```

## Usage examples

### usePrefetchResource 

```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile'}
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```

### useResource 

```js
import { useResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile'}
}

function MyComponent() {
    const { data, fetch } = useResource(resourceConfig)
    useEffect(()=>{
        const request = fetch() //get data on mount
        return request.cancel //terminate request on unmount
    }, [])
}
```

### useCustomRequest 

```js
import { useCustomRequest } from '@cranium/resource';

function tryAsync(API, payload, meta) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ love: 'React' })
    }, 1000)
  })
}

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile'}
}

function MyComponent() {
    const { data, request } = useCustomRequest(tryAsync, resourceConfig)
}
```

### usePrefetchRequest 

```js
import { usePrefetchRequest } from '@cranium/resource';

function tryAsync(API, payload, meta) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ love: 'React' })
    }, 1000)
  })
}

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile'}
}

function MyComponent() {
    const { data, request } = usePrefetchRequest(tryAsync, resourceConfig)
}
```

### useRequest 

```js
import { useRequest } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile'}
}

function MyComponent() {
    const fetchUser = useRequest(resourceConfig)
}
```

###  prefetchResources

```js
import { prefetchResources } from '@cranium/resource'


const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile'}
}


prefetchResources(resourceConfig)(MyReactElement)
````

###  customResource

```js
import { customResource, prefetchResources } from '@cranium/resource'

function myCustomFetch(API, payload, meta) {
  return API.get('/context')
}


const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile'}
}

const customConnectResource = customResource(myCustomFetch)
prefetchResources(customConnectResource(resourceConfig))(MyReactElement)
````

###  Several resources

```js
import {  prefetchResources } from '@cranium/resource'


const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    cache: { storage: localStorage, key: 'profile'}
}

prefetchResources([
    'users',
    resourceConfig
])(MyReactElement)
````
