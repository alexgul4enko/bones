---
id: resource_customresources
title: Custom Resource
sidebar_label: Custom Resource
---

[connectResource](/frontend-docs/docs/resources/connect_resources) will add all possible methods to work with standard REST API.
But what if you need something more then sending 1 HTTP request, what if you have more complex logic?
In this case you may need to use ~~customresource~~


~~customresource~~ is a function that takes 1 argument `async` function and returs modified connectResource function.
**modified** means that you will still have all props that you have with simple ~~customresource~~, but in additional you will have one more async property in your React Component ~~this.props[namespace].customRequest~~ that run your custom async action instead of sending 1 HTTP request based on REST grud.

## Basic ussage

```javascript
import { customResource } from '@ds-frontend/resource'

function myCustomFetch(API, payload, meta) {
  return new Promise(function(resolve,reject){
    setTimeout(()=>resolve({ succes: true }),1000)
  })
}

const customConnectResource = customResource(myCustomFetch)

customConnectResource({ namespace: 'delay' })(MyReactElement)

```

In this example customConnectResource function that takes [Resouce](/frontend-docs/docs/resources/connect_resources#resource) as an argument and return HOC. The difference between ~~connectResource~~ is that customConnectResource can take only 1 [Resouce](/frontend-docs/docs/resources/connect_resources#resource) config, it can not be an array. And it will add 1 more property `this.props.delay.customFetch`.

`myCustomFetch` is function that will be triggered instead of stantard HTTP request. This function acceps 3 arguments:
 - [API](/frontend-docs/docs/api/api_about) module for sending HTTP request
 - payload. Is redux action payload
 - meta. Is redux action meta data
 
:::caution

Pay attantion that function for custom request should return [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

:::