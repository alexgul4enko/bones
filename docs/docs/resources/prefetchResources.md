---
id: resource_prefetchResources
title: prefetchResources
sidebar_label: prefetchResources
---

~~prefetchResources~~ is [HOC](https://reactjs.org/docs/higher-order-components.html) that call async action to retrive remote data when your component mounts to the [DOM](https://www.w3schools.com/js/js_htmldom.asp).

## ~~Standard workflow~~

The main idea is that in most cases when you need to render some React Element you may need to send HTTP request to retrive some remote data and then draw your widget. To do this you basically need to implement next logic

1. using React lifecycle methods, send HTTP request when your Component will be mounted to the DOM
2. Show loading indicator while fetching remote data
3. Terminate pending HTTP request when Component will be unmounted from the DOM
4. clear Redux store data for given Component.

All this things are already made with ~~prefetchResources~~, so that you can safe your time and do not dublicate your code.

## ~~API~~
```javascript
prefetchResources(resources, options)
```

### ~~resources~~

Where `resources` is param that will be passed to [connectResources](/frontend-docs/docs/resources/connect_resources) function.
Same as with connectResources, `resources` could be [Resource](/frontend-docs/docs/resources/connect_resources#resource) object or **Array<Resource\>** or simple [String](/frontend-docs/docs/resources/connect_resources#simple-syntax)

### ~~options~~

Object with additional configurations

|  Property          |      type             |      Default  |
| -------------------| --------------------- | --------------|
|   refresh          | Boolean               | true          |
|   destroyOnUnmount | Boolean               | true          | 
|   defaultParams    | Object                | null          | 
|   Loader           | React Element         |               | 


#### ~~refresh~~
Boolean flag that mostly will used in pair with `destroyOnUnmount = false`.
In general this flag help you to control if you need to send HTTP request once more in case you already have all information to draw your widget.

Lest have an example

```javascript
//in your redux store you have next information

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

import { prefetchResources } from '@ds-frontend/resource'

prefetchResources('users', { refresh: true })(MyReactElement)


```
So in this example you already have all data in store to render your React Element. So if you need to refresh this data then you may need to set `refresh: true` otherwise set it to `false`

#### ~~destroyOnUnmount~~

Boolean flag that determinates if you need to store data after your Component will be removed from the DOM or not.

For example:

1. Your redux store is empty
```json
{

}
```
2. React renders your component with prefetchResources HOC
```javascript
import { prefetchResources } from '@ds-frontend/resource'

prefetchResources('users')(MyReactElement)

```
3. After your element appears in the DOM, ~~prefetchResources~~ HOC will send GET /users HTTP request and store data in redux. Now in redux store you have
```json
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
```

4. Component unmounts from the DOM. And here u can decide if u need this information cached or not. So if destroyOnUnmount false, then `users` object will not be removed from  redux. If `true`, you will have again empty store in redux.

#### ~~defaultParams~~

Default params is optional param that will help you to pass some hardcoded values to your initial HTTP request.
Lets have same example with users list Componet, but now we have lot of users and in UI we have table with pagination. So that on your ComponentDidMount function you should not just `GET /api/users`, but define some custom range of users to show `GET /api/users/?offset=0&limit=25`. To solve this task you may need to use `defaultParams`

```javascript
import { prefetchResources } from '@ds-frontend/resource'

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


#### ~~Loader~~

This is React Element that will be shown while initial request is pending.
:::important

This component will be shown **only** when **initial** request is pending

:::

By default ~~prefetchResources~~ will not render your Component while initial request is pending.
If you want to show your own loader you can create your Loader Component for example

```javascript
function MyAwesomeLoader({ isLoading, children }){
  if(isLoading){
    return "Let's enjoy this awesome text"
  }
  return children
}
```

```javascript
import { prefetchResources } from '@ds-frontend/resource'

prefetchResources({
  namespace: 'users',
  queries: ['offset', 'limit']
}, {
  defaultParams: {
    offset: 0,
    limit: 25
  },
  Loader: MyAwesomeLoader
})(MyReactElement)
```

## ~~customresource on mount~~

You can use [customresource](/frontend-docs/docs/resources/resource_customresources) in pair with ~~prefetchResources~~. 
To do that you just need to pass ~~customresource~~ as a [resources](/frontend-docs/docs/resources/resource_prefetchResources#resources)

```javascript
import { customResource, prefetchResources } from '@ds-frontend/resource'

function myCustomFetch(API, payload, meta) {
  return new Promise(function(resolve,reject){
    setTimeout(()=>resolve({ succes: true }),1000)
  })
}

const customConnectResource = customResource(myCustomFetch)

export default prefetchResources(
  customConnectResource({
    namespace: 'test'
  }),
  {
    refresh: false,
  }
)

//same with short sintax
export default prefetchResources(
  customConnectResource('test'),
  {
    refresh: false,
  }
)

```


## ~~prefetchResources us connectResources~~

In deneral connectResources is a part of prefetchResources.
The main difference is that connectResources will only pass aditional props to your Component and prefetchResources has some implementation with React life cicle.

To decide what HOC to use, you may take a look on this diagram:


<div>
<img src="/frontend-docs/img/diagram.svg"/>
</div>



:::caution

Please do not use React lifecycle methods to send HTTP request on mount by your own.
It is important to use **prefetchResources** for several reasons:
- do not dublicate code
- do not loose implementation that is already done in **prefetchResources**

:::