---
id: resource_withFinalForm
title: withFinalForm
sidebar_label: withFinalForm
---

This is function returns HOC to connect your React Component with [connectResources](/frontend-docs/docs/resources/connect_resources) and [react-final-form](https://final-form.org/react).

This HOC will pass to your React Component [form props](https://final-form.org/docs/react-final-form/types/FormRenderProps) from  react-final-form and props from ~~connectResources~~.
Also this HOC will predefine `onSubmit` function by next criteria:

If your are using [customresource](/frontend-docs/docs/resources/resource_customresources), then it will use ~~this.props[namespace].customRequest~~. Otherwise it will send `POST` or `PATCH` HTTP request based on endpoint and props.


## ~~API~~
```javascript
import { withFinalForm } from '@ds-frontend/resource'

withFinalForm(formConfigs, resources, options)
```
### ~~formConfigs~~

|  Property             |      type                                      |
| ----------------------| ---------------------------------------------- |
|   validate            | ```function(values, props):Object\|Promise```  |
|   onSubmit            | ```function(values, form, props):Promise```    |
|   onSubmitSuccess     | ```function(apiResults, props):void```         |
|   onSubmitFailed      | ```function(apiError, props):void```           |
|   valuesInterceptor   | ```function(values, props, form):Object```     |
|   initialValues       | ```Object\|function(props):Object```           |

#### ~~validate~~
function to handle form level validation. For more information you may read [here](/frontend-docs/docs/skeleton/skeleton_forms#form-level-validation)

#### ~~onSubmit~~
```javascript
function(values, form, props):Promise
```
If default algorithm of onSubmit function does not math your task. You can pass your own implementation of Submit action having `values, form, props`

#### ~~onSubmitSuccess~~
```javascript
function(apiResults, props):void
```
A callback function for success submiting. Here is the best place for navigation and alerts

```javascript
function onSubmitSuccess(values, props){
  props.history.push('some_route')
}
```

#### ~~onSubmitFailed~~
```javascript
function(apiError, props):void
```
A callback function to hanldle non field errors. Here is the best place to show alerts

```javascript
function onSubmitFailed(apiError, props){
  props.alert('ooops, something went wrong')
}
```

#### ~~valuesInterceptor~~
```javascript
function(values, props, form):Object
```
Interceptor function that can help you to modify react-final-form values before sending submit action.

Here you also has props from your Component so that to can merge form values and props if needed.

```javascript
function valuesInterceptor(values, props, form){
  return ... // do something with values and props
}
```

:::caution

Please pay attantion that you can not call any function that will change store or form state in `valuesInterceptor` function. This should be pure function without any side effects!

:::

#### ~~initialValues~~

It cound be an object to define initial state of your react-final-form form state.
Or it could be a function if your need some custom logic

```javascript
function initialValues(props){
  return ... // do something with props and return an Object with initial form values
}
```
:::caution

Please pay attantion that you can not call any function that will change store or react state in `initialValues` function. This should be pure function without any side effects!

:::


### ~~resources~~

`resources` is param that will be passed to [connectResources](/frontend-docs/docs/resources/connect_resources) function.
Same as with connectResources, `resources` could be [Resource](/frontend-docs/docs/resources/connect_resources#resource) object or **Array<Resource\>** or simple [String](/frontend-docs/docs/resources/connect_resources#simple-syntax).

### ~~options~~

Object with additional configurations

|  Property          |      type             |      Default  |
| -------------------| --------------------- | --------------|
|   [refresh](/frontend-docs/docs/resources/resource_prefetchResources#refresh)          | Boolean               | true          |
|   [destroyOnUnmount](/frontend-docs/docs/resources/resource_prefetchResources#destroyonunmount) | Boolean               | true          | 
|   [defaultParams](/frontend-docs/docs/resources/resource_prefetchResources#defaultparams)    | Object                | null          | 
|   [Loader](/frontend-docs/docs/resources/resource_prefetchResources#loader)           | React Element         |               | 
|   prefetch          | Boolean        |        true       | 

Most configurations are same with ~~prefetchResources~~. But here is one new param `prefetch`

#### ~~prefetch~~
Boolean flag that means if you need to have initial request for remote data or not.
In general this will use ~~prefetchResources~~ or ~~connectResources~~ based on [digram](/frontend-docs/docs/resources/resource_prefetchResources#prefetchresources-us-connectresources)


## ~~REST API FLOW~~

By default ~~resources~~ were build to work REST API. This means that in general for all forms you will have 2 possible scenarios:

- Create user => POST /users
- Update existing user => PATCH /users/:uuid

To handle this scenario will use dynamic rote config
```javascript
import { withFinalForm } from '@ds-frontend/resource'

withFinalForm({
    validate,
    onSubmitSuccess,
  },{
    namespace: 'users',
    endpoint: 'users/:uuid?'
  }, {
    prefetch: true //this is default value. and it is here just for example
  })(MyReactElement)
```

:::tip

The most important thing here is to define endpoint with dynamic param and this param should be optional

:::

Having this configurations you will get the most suitable implementation for TEST API.
Here we will have 2 scenarios:
1. component has ~~props.uiud~~

That means that it is form for updating existing user.
In this case u will have:
1. Send GET /users/:uuid on mount
2. Pass responce data as initial values
3. Send PATCH /users/:uuid on submit


2. component has not ~~props.uiud~~
That means that it is form for creating new user.

In this case it will have different scenario:
1. `prefetch: true` option will skip.
2. initial values will be undefined
3. Send POST /users on submit


## ~~form with customResource~~
You can use customResource in pair with withFinalForm.

```javascript
import { customResource, withFinalForm } from '@ds-frontend/resource'

function myCustomFetch(API, payload, meta) {
  return new Promise(function(resolve,reject){
    setTimeout(()=>resolve({ succes: true }),1000)
  })
}

const customConnectResource = customResource(myCustomFetch)

export default withFinalForm(
  {
    validate,
  },
  customConnectResource({
    namespace: 'test'
  }),
  {
    Loader: MyCustomLoader,
  }
)

//same with short sintax
export default withFinalForm(
  {
    validate,
  },
  customConnectResource('test'),
  {
    Loader: MyCustomLoader,
  }
)
```

Using this configuration it will call `myCustomFetch` function on mount component and on Submit.
Please, pay attantion that prefetch option and REST API flow has same flow as with using simple resource the only one difference is that you can define your own async action.
