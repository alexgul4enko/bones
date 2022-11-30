---
id: resource_prefetchResources
title: prefetchResources
sidebar_label: prefetchResources
---

**prefetchResources** [HOC](https://reactjs.org/docs/higher-order-components.html) that calls async action to retrieve remote data when your component mounts to the [DOM](https://www.w3schools.com/js/js_htmldom.asp).

## Standard work flow

The main idea is that in most cases when you need to render some React Element you may need to send HTTP request to retrieve some remote data and then draw your widget. To do this you basically need to implement next logic

1. using React life cycle methods, send HTTP request when your Component will be mounted to the DOM
2. Show loading indicator while fetching remote data
3. Terminate pending HTTP request when Component will be unmounted from the DOM
4. clear Redux store data for given Component.

All this things are already implemented with `prefetchResources`, so that you can safe your time and do not duplicate your code.

## API
```
prefetchResources(resources, options)
```

### resources

Resources is [Resource config](/docs/resources/connect_resource_type), or `Array<ResourceConfig>`

### options

Object with additional configurations

|  Property          |      type             |      Default  |
| -------------------| --------------------- | --------------|
|   refresh          | Boolean               | true          |
|   destroyOnUnmount | Boolean               | true          | 
|   defaultParams    | Object                | null          | 
|   Loader           | React Element         | ```({ isLoading, children})=>   isLoading? null :  children```         |
|   method           | "POST" or "GET"       |   "GET"       | 


#### refresh
Boolean flag that mostly will used in pair with `destroyOnUnmount = false`.
In general this flag helps to control if it is needed to send HTTP request once more in case there is already redux data under this namespace.


```js
//Redux store before Component render

{
  users: {
    data: {
      count: 2,
      results: [
        { uuid: 1, name: 'Users1'},
        { uuid: 2, name: 'Users2'},
      ]
    }
  }
}

import { prefetchResources } from '@cranium/resource'

prefetchResources('users', { refresh: true })(MyReactElement)

```
In this example there is already all data in store to render Users List React Component. In case `refresh` option is `false`, `prefetchResources` HOC will NOT send initial GET request. This is mostly performance flag to do not send same HTTP requests.

#### destroyOnUnmount

Boolean flag to configure if you need to store data after your Component will be removed from the DOM or not.

For example:

1. Redux store is empty
```json
{
  "cars:": { "data": [] }
}
```

2. React renders Component with `prefetchResources` HOC
```javascript
import { prefetchResources } from '@cranium/resource'

prefetchResources('users')(MyReactElement)

```
3. After your element appears in the DOM, `prefetchResources` HOC will send GET `/users` HTTP request and store data in redux. Now in redux store is
```json
{
  "cars:": { "data": [] },
  "users": {
    "data": {
      "count": 2,
      "results": [
        { "uuid": 1, "name": "Users1"},
        { "uuid": 2, "name": "Users2"},
      ]
    }
  }
}
```

4. Component unmount from the DOM.
If `destroyOnUnmount=true`, `prefetchResources` dispatches [`clear` action](/docs/resources/connect_resources#clear-resource-data-clear).
So that redux store will be
```json
{
  "cars:": { "data": [] }
}
```


#### defaultParams

Default params is an optional param to pass hard-coded values to initial HTTP request.

GET `/api/users?offset=0&limit=25` on Component mount

```js {5,7-10}
import { prefetchResources } from '@cranium/resource'

prefetchResources({
  namespace: 'users',
  queries: ['offset', 'limit']
}, {
  defaultParams: {
    offset: 0,
    limit: 25
  }
})(MyReactElement)
```

:::caution

Please do not forget that you need to define `queries` in Resource configs)

:::


#### Loader

React Element that will be shown while initial request is pending.
:::important

This component will be shown **only** when **initial** request is pending. 

:::

By default `prefetchResources` will not render your Component while initial request is pending.
If you want to show your own loader you can create your Loader Component for example.


Loader component accepts 2 props `isLoading` and `children`.

```jsx title="loader.js"
function MyAwesomeLoader({ isLoading, children }){
  if(isLoading){
    return "Let's enjoy this awesome text while fetching data"
  }
  return children
}
```

```jsx
import { prefetchResources } from '@cranium/resource'
import { MyAwesomeLoader } from './loader.js'

prefetchResources({
  namespace: 'users',
  queries: ['offset', 'limit']
}, {
  Loader: MyAwesomeLoader
})(MyReactElement)
```

## Custom Resource

You can use [customResource](/docs/resources/resource_customresources) with `prefetchResources` to call your custom async function on Component mount 

```js
import { customResource, prefetchResources } from '@cranium/resource'

function myCustomFetch(API, payload, meta) {
  return API.get('/context')
}

const customConnectResource = customResource(myCustomFetch)

export default prefetchResources(
  customConnectResource({ namespace: 'test' }),
  {
    Loader: Loader,
  }
)

//or same with short syntax
export default prefetchResources(
  customConnectResource('test'),
  {
    refresh: false,
  }
)

```

## Several resources

```js
import { customResource, prefetchResources } from '@cranium/resource'

function myCustomFetch(API, payload, meta) {
  return API.get('/context')
}

const customConnectResource = customResource(myCustomFetch)

export default prefetchResources([
    'users',
    'cars',
    {
      namespace: 'context', 
      endpoint: `context/data`
    },
    customConnectResource('dogs')
  ],
  {
    Loader: Loader,
  }
)
```


:::caution

Please do not use React life-cycle methods to send HTTP request on mount by your own.
It is important to use **prefetchResources** for several reasons:
- do not duplicate code
- do not loose implementation that is already done in **prefetchResources**

:::