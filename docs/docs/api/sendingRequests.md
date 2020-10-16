---
id: api_requests
title: Sending HTTP requests
sidebar_label: Sending HTTP requests
---


```javascript
api.request(config)
api.get(endpoint [, config])
api.delete(endpoint [, config])
api.options(endpoint [, config])
api.post(url[, data[, config]])
api.put(url[, data[, config]])
api.patch(url[, data[, config]])
```

## ~~config~~

All methost accept config object to configure request

|  Value                    |      Type             |
| ------------------------- | --------------------- |
|   endpoint                | String                |
|   params                  | Object                |
|   paramsSerializer        | function              |
|   method                  | String                |
|   baseURL                 | String                |
|   headers                 | Object                |
|   body                    | Object                |
|   prepareBody             | function              |
|   cache                   | String                |
|   credentials             | String                |
|   mode                    | String                |


### ~~endpoint~~
Requesr endoint Url. 
Note that this url will be concated with [baseURL](/bones/docs/api/api_instance#baseurl)

:::caution

`endpoint` should not contain trailing slashes

:::

### ~~params~~
Object that will be converted to query string

```javascript
// GET /users/?offset=0&limit=20
api.get('users', {
  params: { offset: 0, limit: 20}
})
```

### ~~paramsSerializer~~

Is function that will convert `params` Object to query string. You can setup default paramsSerializer while creating an [instance](/bones/docs/api/api_instance#paramsserializer). And use specific paramsSerializer for particular request.

### ~~method~~

[HTTP Request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

### ~~baseURL~~

With this option you can override [instance baseURL](/bones/docs/api/api_instance#baseurl)

### ~~headers~~

With this option you can override [instance headers](/bones/docs/api/api_instance#headers)

### ~~body~~
Is the data to be sent as the request body.
In general it will be automatically converted to String or FormData so you should not be worry about that.


:::note

`body` will be skipped for GET request

:::

### ~~signal~~
[AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)

###  ~~isMultipartFormData~~

With this option you can override [instance isMultipartFormData](/bones/docs/api/api_instance#ismultipartformdata)

### ~~prepareBody~~

function that will convert data to String or FormData before sending HHTP request.
In general this functoin is already implemented and u can use it only in really specific cases

```javascript
function(body, isMultipartFormData){
  if(isMultipartFormData){
      return new FormData(...)
  }
  return JSON.stringify(body)
}
```

### ~~cache~~

[Request.cache](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)

### ~~credentials~~

[Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)

### ~~mode~~

[Request.mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode)


## ~~request~~

General method to sent whatever HTTP request. Returns promise

```javascript
api.request({
  endpoint: 'users',
  method: 'GET'
})
  .then(function (response) { ... })
  .catch(function (error) { ... })
  .finally(function () { ... })
```

## ~~get~~

Method to sent GET HTTP request. Returns promise

```javascript
api.get('users', {
  params: {
    offset: 0,
    limit: 20
  }
})
  .then(function (response) { ... })
  .catch(function (error) { ... })
  .finally(function () { ... })
```

## ~~delete~~

Method to sent DELETE HTTP request. Returns promise

```javascript
api.delete('users/:uuid', {
  params: {
    uuid: 'clark_kent',
  }
})
  .then(function (response) { ... })
  .catch(function (error) { ... })
  .finally(function () { ... })
```

## ~~options~~

Method to sent OPTIONS HTTP request. Returns promise

```javascript
api.options('users')
  .then(function (response) { ... })
  .catch(function (error) { ... })
  .finally(function () { ... })
```

## ~~post~~

Method to sent POST HTTP request. Returns promise

```javascript
api.post('users', { name: 'Bruce Wayne' },{ signal })
  .then(function (response) { ... })
  .catch(function (error) { ... })
  .finally(function () { ... })
```

## ~~put~~

Method to sent PUT HTTP request. Returns promise

```javascript
api.put('users/:uuid', { city: 'Gotem' },{ params: { uuid: 'bruce_wayne'} })
  .then(function (response) { ... })
  .catch(function (error) { ... })
  .finally(function () { ... })
```

## ~~patch~~

Method to sent PATCH HTTP request. Returns promise

```javascript
api.patch('users/:uuid', { city: 'Gotem' },{ params: { uuid: 'bruce_wayne'} })
  .then(function (response) { ... })
  .catch(function (error) { ... })
  .finally(function () { ... })
```


## ~~dynamic url~~

You can use dynamic url using [path-to-regexp](https://github.com/pillarjs/path-to-regexp) syntax. Dynamic urls will be compiled with params.

```javascript
api.get('users/:uuid', {
  params: {
    uuid: 'wonder_woman',
  }
})
```

