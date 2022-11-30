---
id: connect_resource_type
title: Resource config
sidebar_label:  Resource config
---

**Resource** is type of data to describe API endpoint.
In general **Resource** is an Object with next options:


| Option          |      Date type        |      isRequired       |
| --------------- | --------------------- | --------------------- |
| namespace       |    String             |      true             |
| endpoint        |    String             |      false            |
| forceUpdates    |    Boolean            |      false            |
| queries         |    Array<String\>     |      false            |
| reducer         |    String\|Function   |      false            |
| baseURL         |    String             |      false            |
| cache           |    cacheConfig        |      false            |
| transformValue  |    function           |      false            |
| transformErrors |    function           |      false            |

## namespace
This is the main option and only 1 required.
This option will be used to setup:
 - key in redux store to save data
 - property name to pass to Component using HOC's

```js

connectResources({ namespace: 'cars' })

// component
function ReactComponent({ cars })

// store
{
  cars: {
    ...//resource data
  }
}
```
```js
connectResources({ namespace: 'cats' })

// component
function ReactComponent({ cats })

// store
{
  cats: {
    ...//resource data
  }
}

```

### simple `namespace`
The most common usage is to define `namespace` as a string key in Redux

```js
import { connectResources } from '@cranium/resource'

function MyComponent({ cars }) {

}
connectResources({ namespace: 'cars', endpoint: 'cars' })(MyComponent)
```

### `namespace` as dynamic Url

You can define `namespace` as an Url with dynamic arguments. In this case `namespace` will be used as `endpoint` and original value of `namespace` will be string without all dynamic parts

```js
import { connectResources } from '@cranium/resource'

function MyComponent({ cars }) {

}
connectResources({ namespace: 'cars/:uuid' })(MyComponent)

/*
 * same as
 * connectResources({ namespace: 'cars', endpoint: 'cars/:uuid' })(MyComponent)
*/
```

### `namespace` as Url

You can define `namespace` as an Url. In this case `namespace` will be used as `endpoint` and original value of `namespace` will be cammelCased string without all dynamic parts

```js
import { connectResources } from '@cranium/resource'

function MyComponent({ carsBmw }) {

}
connectResources({ namespace: 'cars/bmw' })(MyComponent)

/*
 * same as
 * connectResources({ namespace: 'carsBmw', endpoint: 'cars/bmw' })(MyComponent)
*/
```



## endpoint

**endpoint** is URL String to describe your HTTP request. This field is not required and by default equals to `namespace`
To have dynamic url config you can use [path-to-regex](https://www.npmjs.com/package/path-to-regex) syntax.


### Basic ussage
```js
function Component({ cars }) {
  cars.fetch() // -> GET /api/carslist
}
connectResources({ namespace: 'cars', endpoint: 'carslist' })(Component)
```

### Missed endpoint
```js
function Component({ cars }) {
  cars.fetch() // -> GET /api/cars
}
connectResources({ namespace: 'cars' })(Component)
```

### Dynamic endpoint
```js
function Component({ car }) {
  car.fetch() // -> GET /api/cars
  car.fetch({ uuid: 'tesla' }) // -> GET /api/cars/tesla
  car.update({ uuid: 'tesla', color: 'blue' }) // -> PATCH /api/cars/tesla { color: 'blue' }
  car.post({ model: 'tesla', color: 'blue' }) // -> POST /api/cars/tesla { model: 'tesla',  color: 'blue' }
}
connectResources({ namespace: 'car' endpoint: 'cars/:uuid?'})(Component)
```
:::caution
`endpoint` should not contain trailing slashes
:::

## forceUpdates
A boolean indicator that controls if it needed to store filters, loading, and errors in redux store. Default `false`

This is common usage for form submit actions where you don't need to save errors and loading states in redux.


```js
function Component({ car }) {
  const { filters, isLoading, errors } = car
  car.fetch()
  /* 
  * with forceUpdates true
  * filters, isLoading, errors will never change
  * and only car.data will change
  */
}
connectResources({ namespace: 'car' forceUpdates: true })(Component)
```


## queries

Array of possible query params. It is recommended to pass here all possible query params that are defined in your Swagger schema. 

```js
connectResources({ 
  namespace: 'cars',
  queries: ['offset', 'limit', 'search']
})
```

:::caution

It is important to define `queries` if you need to send HTTP request with query string.
Otherwise your get requests will be without filters even if you pass it to `fetch` function

Bad
```js

function Component({ cars }) {
  //GET /cars
  //offset and limit will be skipped
  cars.fetch({ offset: 0, limit: 20 })
}
connectResources({ namespace: 'cars' })(Component)
```

Good
```js
function Component({ cars }) {
  //GET /cars?offset=0&limit=20
  cars.fetch({ offset: 0, limit: 20 })
}
connectResources({ namespace: 'cars', queries: ['offset', 'limit'] })(Component)
```

:::

:::tip

queryString will only work for GET requests. If you need to send HHTP a query string with what ever else HTTP request type, you need to pass queries once more as overrides meta.

For example `POST /cars?country=uk`

Bad
```js

function Component({ cars }) {
  //POST /cars
  // country included to body
  //body { model: 1, color: 'red', year: 2020, country: 'uk' }
  cars.create({ 
    model: 1, 
    color: 'red', 
    year: 2020, 
    country: 'uk' 
  })
}
connectResources({ namespace: 'cars' })(Component)
```

Good
```js

function Component({ cars }) {
  //POST /cars?country=uk
  // country excluded from body
  //body { model: 1, color: 'red', year: 2020 }
  cars.create({ 
    model: 1, 
    color: 'red', 
    year: 2020, 
    country: 'uk' 
  }, { queries: ['country'] })
}
connectResources({ namespace: 'cars' })(Component)
```
:::

## reducer

Function that will be called in [redux reducer](https://redux.js.org/basics/reducers). Default `'replace'`.
By default connect resources has already defined 4 types of most reusable reducers.
And you may use it as a String.

Or you can create your own reducer and pass is as a function

```javascript
connectResources({ namespace: 'cars', reducer: 'object' })
connectResources({ namespace: 'cars', reducer: 'none' })
connectResources({ namespace: 'cars', reducer: 'replace' })
connectResources({ namespace: 'cars', reducer: 'infinityList' })
connectResources({ namespace: 'cars', reducer: myCustomReducer })
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
function myCustomReducer(state, payload){
  return { ...state, ... payload, count: state.count + 1 }
}
connectResources({ namespace: 'cars', reducer: myCustomReducer })
```

:::caution

Creating your own reducer, please pay attention to [Redux Style Guide](https://redux.js.org/style-guide/style-guide)

:::

### baseURL

By default `API` module is configured to use the base URL prefix `/api/`.
That means that you can use an endpoint like `users` that will send HTTP requests to `/api/users` URL.
To change default `/api/` value you can use `baseURL` config

```js
connectResources({ namespace: 'users', endpoint: 'users', baseURL: '/api/v2/' })
// GET /api/v2/users
```
:::caution

Please check that you add `/` at the end of the `baseURL` config

Bad
```js
connectResources({ namespace: 'users', endpoint: 'users', baseURL: '/api/v2' })

```
Good
```js
connectResources({ namespace: 'users', endpoint: 'users', baseURL: '/api/v2/' })

```
:::

## cache

Cache module configuration to store API data in storage.
For more info, use the [link](/docs/cache/resource-cache)


## transformValue

Function to modify API responce data before passing to React component and caching

```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    transformValue: (userData) => ({...userData, fullName: `${userData.fistName} ${userData.lastName}` })
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```


## transformErrors

Function to modify API responce errors before passing to React component

```js
import { usePrefetchResource } from '@cranium/resource';

const resourceConfig = {
    namespace: 'profile',
    endpoint: 'users/me',
    transformErrors: (erros) => //... modify Errors
}

function MyComponent() {
    const { data } = usePrefetchResource(resourceConfig)
}
```

## Simple syntax

As you may remember that `Resource` object has only 1 required option (namespace), you can use more light syntax to define Resource as a String

```js

/*
 * same as { namespace: 'cars', endpoint: 'cars' }
*/
connectResources('cars')


connectResources('cars/:uuid') 

/*
 * same as { namespace: 'carsSearch', endpoint: 'cars/search' }
*/
connectResources('cars/search')

```