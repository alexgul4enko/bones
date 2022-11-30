---
id: resource_withFinalForm
title: withFinalForm
sidebar_label: withFinalForm
---

Function that returns HOC to connect your React Component with [connectResources](/docs/resources/connect_resources) and [react-final-form](https://final-form.org/react).

This HOC will pass to your React Component [form props](https://final-form.org/docs/react-final-form/types/FormRenderProps) from  react-final-form and props from`connectResources`

Also this HOC will predefine `onSubmit` function. In case your are using [customresource](/docs/resources/resource_customresources), then it will use `this.props[namespace].request`. Otherwise it will send `POST` or `PATCH` HTTP request based on endpoint and props.


```javascript
import { withFinalForm } from '@cranium/resource'

withFinalForm(formConfigs, resources, options)
```
## formConfigs

|  Property             |      type                                      |
| ----------------------| ---------------------------------------------- |
|   validate            | ```function(values, props):Object\|Promise```  |
|   onSubmit            | ```function(values, form, props):Promise```    |
|   onSubmitSuccess     | ```function(apiResults, props):void```         |
|   onSubmitFailed      | ```function(apiError, props):void```           |
|   valuesInterceptor   | ```function(values, props, form):Object```     |
|   initialValues       | ```Object\|function(props):Object```           |

### validate
Function to handle form level validation.
```js
import { withFinalForm } from '@cranium/resource'

function validate (values, props) {
  const errors = {}
  if(!values.password){
    errors.password = 'This field is required'
  }
  if(values.city === 'NY' && props.country === 'UK'){
    errors.city = 'There is no such city in UK'
  }
  return errors
}

export default withFinalForm(
  {
    validate: validate
  },
  'users'
)
```

### onSubmit
Custom Submit function. You can use it to override default logic.

:::tip
By default `onSubmit` will send POST or PATCH request based on props. And use `request` in case you. are using [customresource](/docs/resources/resource_customresources)
:::

:::note
Please note that it is important to return `Promise` from `onSubmit` function.
```js
function(values, form, props):Promise
```
:::

```js
import { withFinalForm } from '@cranium/resource'

export default withFinalForm(
  {
    onSubmit: (values, form, props)=>{
      return props.users.create(values)
    }
  },
  'users'
)
```


### onSubmitSuccess
Callback function for success submitting. It is the best place for navigation and alerts
```ts
function(apiResults, props):void
```


```js
import { withFinalForm } from '@cranium/resource'

export default withFinalForm(
  {
    onSubmitSuccess: (values, props)=>{
      props.history.push('some_route')
    }
  },
  'users'
)
```


### onSubmitFailed
Callback function to handle non field errors. Here is the best place to show alerts
```ts
function(apiError, props):void
```


```js
import { withFinalForm } from '@cranium/resource'

export default withFinalForm(
  {
    onSubmitFailed: (apiError, props)=>{
      props.alert(apiError.error)
    }
  },
  'users'
)
```

### valuesInterceptor
Interceptor function that can help you to modify react-final-form values before sending submit action.

Here you also has props from your Component so that to can merge form values and props if needed.

```ts
function(values, props, form):Object
```

```js
import { withFinalForm } from '@cranium/resource'

export default withFinalForm(
  {
    valuesInterceptor: (values, props, form)=>{
      return {
        ...values,
        city: props.city,
        name: values.name.toUpperCase()
      }
    }
  },
  'users'
)
```

:::caution

Please pay attention that you can not call any function that will change store or form state in `valuesInterceptor` function. This should be pure function without any side effects!

:::

### initialValues

Configuration to setup form initial values.
:::tip
By default `initialValues` are resource data.
```js
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({}, 'users/me')(FormViewComponent)
//In this case `withFinalForm` will send GET /api/users/me request and setup initial values as a response from API call.
```
:::

```js
// initial values as const
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({
  initialValues: {
    account: 'Conductor'
  }
}, 'users/me')(FormViewComponent)
```
```js
// initial values as a function
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({
  initialValues: (props)=> {
    return {
      account: props.account
    }
  }    
}, 'users/me')(FormViewComponent)
```
:::caution

Please pay attention that you can not call any function that will change store or react state in `initialValues` function. This should be pure function without any side effects!

:::


## resources

[Resource config](/docs/resources/connect_resource_type) or [Custom Resource](/docs/resources/resource_customresources)

### Resource config


```js
//POST /api/users onSubmit
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({}, 'users')(FormViewComponent)
```

```js
//POST /api/users/me onSubmit
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({}, { namespace: 'profile', endpoint: 'users/me' })(FormViewComponent)
```

```js
// custom resource
import { customResource, withFinalForm } from '@cranium/resource'

function customResource(API, payload, meta, store ) {
  API.patch('users/:uuid', payload, { params: { uuid: payload: uuid } } )
    .then(()=> API.get('users/:uuid', { params: { uuid: payload: uuid } }))
} 

const connectResource = customResource(customResource)

export default withFinalForm({}, connectResource('profile'))(FormViewComponent)

```

## options

Object with additional configurations. To read more visit this [link](/docs/resources/resource_prefetchResources#options) 

|  Property          |      type             |      Default  |
| -------------------| --------------------- | --------------|
|   [refresh](/docs/resources/resource_prefetchResources#refresh)          | Boolean               | true          |
|   [destroyOnUnmount](/docs/resources/resource_prefetchResources#destroyonunmount) | Boolean               | true          | 
|   [defaultParams](/docs/resources/resource_prefetchResources#defaultparams)    | Object                | null          | 
|   [Loader](/docs/resources/resource_prefetchResources#loader)           | React Element         |               | 
|   method          | 'GET' | POST        |        'GET'       | 
|   prefetch          | Boolean        |        true       | 

Most configurations are same with `prefetchResources`. But here is one new param `prefetch`

### prefetch
Boolean flag to configure if `withFinalForm` HOC needs to send initial API request to setup initial values.

```js
//POST /api/users/me on mount and setup initial values
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({}, 'users/me', {
  prefetch: true
})(FormViewComponent)
```

```js
//DO not send any GET requests on mount initial values are empty or defined with `initialValues` option
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({}, 'users/me', {
  prefetch: false
})(FormViewComponent)
```



## REST API FLOW

By default `resources` were build to work REST API. This means that in general for all forms you will have 2 possible scenarios:

- Create user => POST /users
- Update existing user => PATCH /users/:uuid


```js
import { withFinalForm } from '@cranium/resource'

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
The most important thing here is to define endpoint with dynamic param `users/:uuid?` and this param should be optional `?` at the end of arg name.  
:::

Having this configurations you will get the most suitable implementation for REST API.
Here we will have 2 scenarios:
### Update existing
Component has `props.uuid`

```js title="myform.js"
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({
    validate,
    onSubmitSuccess,
  },{
    namespace: 'users',
    endpoint: 'users/:uuid?'
  }, {
    prefetch: true //this is default value. and it is here just for example
  })(MyReactElement)
```
```js
import MyForm from 'myform'

function App () {
  return <MyForm uuid="234"/>
}
```


That means that it is form for updating existing user.
In this case u will have:
1. Send GET /users/:uuid on mount
2. Pass response data as initial values
3. Send PATCH /users/:uuid on submit

### Create new
Component does not has `props.uuid`

```js title="myform.js"
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({
    validate,
    onSubmitSuccess,
  },{
    namespace: 'users',
    endpoint: 'users/:uuid?'
  }, {
    prefetch: true //this is default value. and it is here just for example
  })(MyReactElement)
```
```js
import MyForm from 'myform'

function App () {
  return <MyForm />
}
```

That means that it is form to create new user.

In this case it will have different scenario:
1. `prefetch: true` option will skip. There will not be GET request on mount
2. initial values will be empty.
3. Send POST /users on submit

### Navigation params with Forms

You can use same Component for both Edit and Create forms. That are rendered on 2 different screens.

```js title="form.js"
import { withFinalForm } from '@cranium/resource'
import { compose } from 'redux'

export default compose(
  withFinalForm({
    validate,
    onSubmitSuccess,
  },{
    namespace: 'users',
    endpoint: 'users/:uuid?'
  }, {
    prefetch: true //this is default value. and it is here just for example
  })
)(MyReactElement)
```

```js {5,6,9,10} title="routes.js"
import Form from 'form'

export const routes = [
  {
    path: 'users/:uuid/edit',
    component: Form
  },
  {
    path: 'users/create',
    component: Form
  },
]
```




## customResource
You can use customResource in pair with withFinalForm.

```js
import { customResource, withFinalForm } from '@cranium/resource'

function myCustomFetch(API, payload, meta) {
  if(meta.type === 'PREFETCH') { //initial GET request to setup form initial values
    return API.get('users/me')
  }
  if(meta.method === 'POST') { // create new user
    return API.post('users' payload)
  }
  if(meta.method === 'PUT') { // update user
    return API.put('users/:uuid' payload, { params: { uuid: users.uuid }})
  }
}

const customConnectResource = customResource(myCustomFetch)

export default withFinalForm(
  {
    validate,
  },
  customConnectResource({
    namespace: 'users',
    endpoint: 'users/:uuid?'
  }),
  {
    Loader: MyCustomLoader,
  }
)(ReactFormComponent)

//same with short syntax
export default withFinalForm(
  {
    validate,
  },
  customConnectResource('users/:uuid?'),
  {
    Loader: MyCustomLoader,
  }
)(ReactFormComponent)
```

Using this configuration it will call `myCustomFetch` function on mount component and on Submit.
Please, pay attention that prefetch option and REST API flow has same flow as with using simple resource the only one difference is that you can define your own async action.
