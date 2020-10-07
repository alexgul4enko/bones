---
id: api_interceptors
title: Interceptors
sidebar_label: Interceptors
---

Interceptors are a powerful mechanism that can monitor and rewrite HTTP request before and after sending requests.

:::caution

Interceptors should only modify request/responce and return modified argument. It is consider rule. Please pay attantions while throwing errors inside interceptor it could lead to unpredictable bugs. 

:::


## ~~Intercept request~~
You can intercept request before fetch

```javascript
api.interceptors.request.use({
  onSuccess: (requestData)=>{},
  onError: (requestData)=>{}
})
```

In most cases there will not be onError interceptor while intercepting request. This situation could be only if you have some bugs in your own onSuccess interceptor.

The most popular usecase for request interceptor is to pass authorisation header.

```javascript
api.interceptors.request.use({
  onSuccess: (consfigs) => {
    const headers = new Headers(consfigs.headers)
    headers.set('Authorization', `JWT ${jwtToken}`)
    return {
      ...consfigs,
      headers,
    }
  },
})
```
Mostly if you are using [Redux](https://redux.js.org/) it is better to create [middleware](https://redux.js.org/advanced/middleware) for setting up Authorization header.

```javascript

export default function authMiddleware(store) {
  let removeRequestInterceptor
  return (next) => action => {
    if(action.type === 'Login'){
      removeRequestInterceptor && removeRequestInterceptor() // delete previous interceptor if exists
      removeRequestInterceptor = api.interceptors.request.use({
        onSuccess: (consfigs) => {
          const headers = new Headers(consfigs.headers)
          headers.set('Authorization', `JWT ${action.payload}`)
          return {
            ...consfigs,
            headers,
          }
        },
      })
    }
    if(action.type === 'Logout'){
      removeRequestInterceptor && removeRequestInterceptor() // delete previous interceptor if exists
      removeRequestInterceptor = undefined
    }
    return next(action)
  }
}
```


## ~~Intercept responce~~

You can intercept request after sending Request

```javascript
api.interceptors.response.use({
  onSuccess: (responce)=>{},
  onError: (responce)=>{}
})
```

The most popular usecase for responce interceptor is to clear Rudux store on [401](https://httpstatuses.com/401) responce status code. And the best place to do that is to create middleware


```javascript
export default function authMiddleware(store) {
  api.interceptors.response.use({
    onError: function({ data, response }) {
      if(get(response, 'status') === 401) {
        store.dispatch(logout())
        throw new Error(response.statusText)
      }
      return { data, response }
    },
  })
  return (next) => action => {
    return next(action)
  }
}

```

## ~~delete interceptor~~

Functions ~~response.use~~ and ~~request.use~~ returns functoin to delite this interceptor.

```javascript
const deleteInterceptor = api.interceptors.request.use({...})
deleteInterceptor()
```

```javascript
const deleteInterceptor = api.interceptors.response.use({...})
deleteInterceptor()
```
