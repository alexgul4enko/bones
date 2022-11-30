---
id: connect_resources
title: connectResources
sidebar_label: connectResources
---

**connectResources** is a function that will return [HOC](https://reactjs.org/docs/higher-order-components.html) to pass all necessary props to your React component for async HTTP request.

`connectResources` accept 1 argument  [ResourceConfig](/docs/resources/connect_resource_type) or an Array of [ResourceConfig](/docs/resources/connect_resource_type)

```ts
import connectResources from '@cranium/resource' 

connectResources(ResourceConfig | []ResourceConfig)
```

## Basic usage

```js
import { connectResources } from '@cranium/resource'

function MyReactComponent({ users }){
  const {
      // meta data
      data,            // body from success HTTP request
      isLoading,       // boolean flag to determinate async action status
      options,         // body from success OPTIONS HTTP request
      errors,          // error from HTTP request
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
      clear,           // action to clear current part of redux store
  } = users
  return ...
}
/*
 * Using 1 line of code you will have prop users inside your React Component to:
 * - work with HTTP requests 
 * - change redux store data
*/
export default connectResources('users')(MyReactComponent)
```

:::tip
You will have same property name as argument in  `connectResources`.
Like `<MyReactComponent>` has property `users` because of `connectResources('users')`
:::

## Redux 
1 of biggest redux problem is that it is required to create reducers to handle changes for each part of store data.
That's why Redux applications on start have store with lot of empty objects, like:
```js
{
  users: {
    data: null,
    errors: null,
    isLoading: false
  },
  user: {
    data: null,
    errors: null,
    isLoading: false
  },
  cars: {
    data: null,
    errors: null,
    isLoading: false
  },
  pets: {
    data: null,
    errors: null,
    isLoading: false
  }
}
```
`resources` module has empty store on start. And data in store will appear while sending HTTP requests. Also by default `resources` module clears redux store on component unmount, so that you will see only that data in redux store that is currently using to render current components.

1. Initial app store
```js title="redux store"
{}
```
2. Render component wrapped with `connectResources`
```js title="redux store"
{}
```
3. Send first HTTP request
```js title="redux store"
{ 
  users: {
    data: { count: 12, results: [] },
    errors: null,
    isLoading: false
  }
}
```
4. Unmount component
```js title="redux store"
{}
```

In this way Redux store will be readable and understandable. There will not be any unused data, so ot will be more optimized

## Sending HTTP requests

### GET request

```js {7}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { data, isLoading, errors, fetch } = users
  useEffect(()=>{
    //GET /api/users
    fetch()
  },[])
  if(isLoading){
    return 'Loading...'
  }
  if(errors){
    return 'Oooops... Server is temporary unavailable'
  }
  return data.map(user=><User {...data} key={user.uuid}/>)
}
export default connectResources('users')(UserList)
```
### GET request with dynamic URL

```js {7}
import { connectResources } from '@cranium/resource'

function UserList({ user }) {
  const { data, isLoading, errors, fetch } = user
  useEffect(()=>{
    //GET /api/users/taras
    fetch({ uuid: 'taras' })
  },[])
  if(isLoading){
    return 'Loading...'
  }
  if(errors){
    return 'Oooops... Server is temporary unavailable'
  }
  return <h1> Welcome {data.fullName}<h1>
}
export default connectResources({
  namespace: 'user',
  endpoint: 'users/:uuid'
})(UserList)
```

### GET request with query params

```js {7,20}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { data, isLoading, errors, fetch } = users
  useEffect(()=>{
    //GET /api/users?offset=0&limit=10
    fetch({ offset: 0, limit: 10 })
  },[])
  if(isLoading){
    return 'Loading...'
  }
  if(errors){
    return 'Oooops... Server is temporary unavailable'
  }
  return data.map(user=><User {...data} key={user.uuid}/>)
}
export default connectResources({
  namespace: 'users',
  endpoint: 'users',
  queries: ['offset', 'limit']
})(UserList)
```

:::info

Please note that it is important to describe all possible `queries`.
This is made to build query string only with values that current API support. Like swagger schema.
This optimization will add more safety to your code

```js {7,13}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { data, isLoading, errors, fetch } = users
  useEffect(()=>{
    //GET /api/users?offset=0&limit=10
    //fakeData data will not appear in HTPP request URL
    fetch({ offset: 0, limit: 10, fakeData: 'fake' })
  },[])
}
export default connectResources({
  namespace: 'users',
  endpoint: 'users',
  queries: ['offset', 'limit']
})(UserList)
```
:::

### OPTIONS request

```js {7}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { options, isLoading, errors, fetchOptions } = users
  useEffect(()=>{
    //OPTIONS /api/users
    fetchOptions()
  },[])
  if(isLoading){
    return 'Loading...'
  }
  if(errors){
    return 'Oooops... Server is temporary unavailable'
  }
  return <p>{options.count}</p>
}
export default connectResources('users')(UserList)
```

### POST request

```js {7}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { data, isLoading, errors, create } = users
  useEffect(()=>{
    //POST /api/users
    create({ name: 'wonder woman', world: 'DC' })
  },[])
  if(isLoading){
    return 'creating Wonder Woman'
  }
  if(errors){
    return 'Oooops... Can not create super hero'
  }
  return <p>{data.name} is created</p>
}
export default connectResources('users')(UserList)
```

### DELETE request

```js {7}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { isLoading, errors, remove } = users
  useEffect(()=>{
    //DELETE /api/super-man
    remove({ hero: 'super-man' })
  },[])
  if(isLoading){
    return 'deleting Super Man'
  }
  if(errors){
    return 'Oooops... Super Man is stronger than our API, please try again'
  }
  return <p>Super Man has gone</p>
}
export default connectResources('users/:hero')(UserList)
```
### PUT request

```js {7}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { isLoading, errors, replace } = users
  useEffect(()=>{
    //PUT /api/super-man
    replace({ hero: 'wonder-woman', isSingle: true })
  },[])
  if(isLoading){
    return 'updating Wonder Woman'
  }
  if(errors){
    return 'Oooops... Yaron Varsano is stronger than our API, please try again'
  }
  return <p>Wonder Woman is now single</p>
}
export default connectResources('users/:hero')(UserList)
```

### PATCH request

```js {7}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { isLoading, errors, update } = users
  useEffect(()=>{
    //PATCH /api/super-man
    update({ hero: 'wonder-woman', isSingle: true })
  },[])
  if(isLoading){
    return 'updating Wonder Woman'
  }
  if(errors){
    return 'Oooops... Yaron Varsano is stronger than our API, please try again'
  }
  return <p>Wonder Woman is now single</p>
}
export default connectResources('users/:hero')(UserList)
```

:::note
To send PUT, PATCH, POST request with dynamic url, add URL params to body request
```js
// For URL /users/:uuid

//PUT /users/123-1233-123 { name: test }
replace({ uuid: '123-1233-123', name: 'test' })

//PATCH /users/123-1233-123 { name: test }
update({ uuid: '123-1233-123', name: 'test' })

//POST /users/123-1233-123 { name: test }
create({ uuid: '123-1233-123', name: 'test' })

```
:::

### Terminating requests

Every async action returns Promise with 1 extra method `cancel` that calls AbortController `abort` function. [Read more](/docs/api/api_terminate)

```js {7,8}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { data, isLoading, errors, fetch } = users
  useEffect(()=>{
    //GET /api/users
    const request = fetch()
    return request.cancel
  },[])
}
export default connectResources('users')(UserList)
```

### Handling HTTP requests

```js {7-10}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { data, isLoading, errors, fetch } = users
  useEffect(()=>{
    //GET /api/users
    fetch()
      .then((data)=>console.log(data))
      .catch(console.warn)
      .finally(()=>alert('done'))
  },[])
  
}
export default connectResources('users')(UserList)
```

## Changing store data

### setData

```js {5,7}
import { connectResources } from '@cranium/resource'

function MyComponent({ users }) {
  const { data, setData } = users
  setData({ wife: 'Wonder Woman' })  

  return <p>Your wife is: {data.wife}</p>
}
export default connectResources('users')(MyComponent)
```

### setLoading

```js {5,7}
import { connectResources } from '@cranium/resource'

function MyComponent({ users }) {
  const { isLoading, setLoading } = users
  setLoading(true)  

  return <p>{isLoading ? 'Loading...': 'Loaded'}</p>
}
export default connectResources('users')(MyComponent)
```

### setErrors

```js {5,7}
import { connectResources } from '@cranium/resource'

function MyComponent({ users }) {
  const { errors, setErrors } = users
  setErrors('Ooops...')  

  return <p>{errors}</p>
}
export default connectResources('users')(MyComponent)
```

### setFilters

```js {5,7}
import { connectResources } from '@cranium/resource'

function MyComponent({ users }) {
  const { filters, setFilters } = users
  setFilters({ offset: 0, limit: 12})  

  return <p>offset: {filters.offset}, limit {filters.limit}</p>
}
export default connectResources('users')(MyComponent)
```


## Several resources
To have several resources in 1 Component, you can define an Array of Resources to `connectResources`

```js
function MyComponent({ cars, pets }){
  //than u will have 2 resources in 1 component
}
connectResources([
  { namespace: 'cars' },
  'pets'
])(MyComponent)
```

:::caution

Pay attention that all resources should have unique namespace, otherwise it will just override each other

:::

:::tip

Pay that is it much better to split your code. That's why mostly it is not a good choice to use several resources in 1 React Component.

<span style={{color: 'red', fontWeight: 'bold'}}>BAD</span>

```jsx title="my-component.js"

connectResources([
  { namespace: 'cars' },
  { namespace: 'pets' }
])

function MyComponent({ cars, pets }){
  return (
    <Pets {...pets}/>
    <Cars {...cars}/>
  )
}
````

<span style={{color: 'green', fontWeight: 'bold'}}>GOOD</span>

```js title="with-pets.js"
export default connectResources({ namespace: 'pets' })
```
```js title="with-cars.js"
export default connectResources({ namespace: 'cars' })
```
```js title="pets.js"
import PetsView from './pets-view'
import withPets from './with-pets'

export default withPets(PetsView)
```

```js title="cars.js"
import CarsView from './cars-view'
import withCars from './with-cars'

export default withCars(CarsView)
```

```jsx title="my-component.js"

import Pets from './pets'
import Cars from './cars'

export default function MyComponent(){
  return (
    <>
      <Pets/>
      <Cars/>
    </>
  )
}
```
:::

## filters
Filters is json object that contains Query string and Url params from latest HTTP request.

```jsx {7,18-20,26,27}
import { connectResources } from '@cranium/resource'

function UserList({ users }) {
  const { filters, isLoading, errors, fetch } = users
  useEffect(()=>{
    //GET /api/users/dc?offset=0&limit=10
    fetch({ offset: 0, limit: 10, world: 'dc' })
  },[])
  if(isLoading){
    return 'Loading...'
  }
  if(errors){
    return 'Oooops... Server is temporary unavailable'
  }

  return (
    <>
      <p>world: {filters.world}</p>   // world: dc
      <p>offset: {filters.offset}</p> // offset: 0
      <p>limit: {limit.limit}</p>     // limit: 10
    </>
  )
}
export default connectResources({
  namespace: 'users',
  endpoint: 'users/:world',
  queries: ['offset', 'limit']
})(UserList)
```

## Clear resource data (`clear`)

To delete resource data from redux use `clear` action

```js {12}
import { connectResources } from '@cranium/resource'

function MyComponent({ users }) {
  const { data, setData, clear } = users
  setData({ wife: 'Wonder Woman' })
  /*
  * after setData action redux store is
  * {
  *     cars: { data: ['BMW'] }
  *     users: { data: { wife: 'Wonder Woman'} }
  * }
  */ 
  clear()
  /*
  * after clear action redux store is
  * {
  *     cars: { data: ['BMW'] }
  * }
  */ 

}
export default connectResources('users')(MyComponent)
```

`clear` action will fully remove data from Redux store by `namespace` key


