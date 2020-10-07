---
id: connect_resources
title: ConnectResources
sidebar_label: ConnectResources
---

~~ConnectResources~~ is a function that will return [HOC](https://reactjs.org/docs/higher-order-components.html) to pass all necessary props to your React component for async HTTP request.

## ~~Basic usage~~

```javascript
import { connectResources } from '@ds-frontend/resource'

function MyReactComponent({ users }){
  //using 1 line of code you will have aditions prop users inside your React Component
  return ...
}

export default connectResources('users')(MyReactComponent)
```

```
// users property

// async actions
users.fetch           => function to send GET HTTP request
users.fetchOptions    => function to send OPTIONS HTTP request
users.create          => function to send POST HTTP request
users.replace         => function to send PUT HTTP request
users.update          => function to send PATCH HTTP request
users.remove          => function to send DELETE HTTP request

// sync actions

users.setData         => function to store data in redux
users.setLoading      => function to toggle loading flag and store in redux
users.setErrors       => function to store errors in redux
users.setFilters      => function to JSON representation of query string
users.clear           => function to clear current part of redux store

// meta data
users.data            => body from success HTTP request
users.isLoading       => boolean flag to determinate async action status
users.options         => body from success OPTIONS HTTP request
users.errors          => error from HTTP request
users.filters         => JSON representation of query string


```


## ~~How does it work~~

On initial state you will not have any meta data in your React component. 

Then you may want to retrive a list of users `GET /users`

To do that you already have all necessary propperties

```javascript
this.props.users.fetch()
```

Calling whatever async actions you will have next working flow:

1.1. ~~Toogle loading~~. Toogle loading indicator to `true` 
```json
// component

this.props.users.isLoading => true

// store
{
  users: {
    isLoading: true
  }
}
```
1.2. ~~Clear errors~~. This is common principle that all next API requests should clear errors (*if exist) from previous one. 
```json
// component

this.props.users.errors => undefined

// store
{
  users: {
    errors: undefined
  }
}
```

1.3 ~~Save filters~~. If you need to pass query string with your HHTP request, resources will store filters in redux, that could be usefull for example to increment page in infility lists. JSON representation of query string will be next transformed to string with [queryParams module](/frontend-docs/docs/queryParams/queryParams_about)

```json
//how to pass filters
this.props.users.fetch({ page: 1 }, { queries: ['page'] })

// component
this.props.users.filters => { page: 1 }

// store
{
  users: {
    filters: {
      page: 1
    }
  }
}
```

2. ~~Send HHTP request~~. Http request will be handled by [API module](/frontend-docs/docs/api/api_about)

3.1. ~~Toogle loading~~. Toogle loading indicator to `false` 
```json
// component

this.props.users.isLoading => false

// store
{
  users: {
    isLoading: false
  }
}
```
3.2 ~~Save responce~~. 
- success request

```json
// component

this.props.users.data => HTTP request body

// store
{
  users: {
    data: {...} //HTTP request body
  }
}
```
- errror 
```json
// component

this.props.users.errors => HTTP request error

// store
{
  users: {
    errors: {...} //HTTP request error
  }
}
```
- options. in case `fetchOptions` 
```json
// component

this.props.users.options => HTTP request body

// store
{
  users: {
    options: {...} //HTTP request body
  }
}
```

## ~~API~~

```
connectResource(resources [Resource | Array<Resource>])
```

~~connectResource~~ is a function as acceps `Resource` or an array of `Resource`'s as argument and returns HOC, that will pass all props for HTTP request to your React Component.

### ~~Resource~~

~~Resource~~ is a new type of data to describe API endpoint.
In general ~~Resource~~ is an Object with next options:


| Option          |      Date type        |      isRequired       |
| --------------- | --------------------- | --------------------- |
| namespace       |    String             |      true             |
| endpoint        |    String             |      false            |
| forceUpdates    |    Boolean            |      false            |
| queries         |    Array<String\>     |      false            |
| reducer         |    String\|Function   |      false            |


#### ~~namespace~~
This is the main option and only 1 required.
By defining this option u will set up a key in redux where all information will be stored and name for property in your React Component. For example:

```javascript

connectResources({ namespace: 'cars' })

// component

function ReactComponent({ cars })

// store

{
  cars: {
    ...//resource data
  }
}

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

#### ~~endpoint~~

endpoint is url String to describe your HTTPS request. This field is not required and by default equals to [namespace](/frontend-docs/docs/resources/connect_resources#namespace).

To have dynamic url config you can use [path-to-regex](https://www.npmjs.com/package/path-to-regex) syntax.

Examples:

- basic ussage
```javascript
connectResources({ namespace: 'cars', endpoint: 'carslist' })
```

- missed endpoint
```javascript
connectResources({ namespace: 'cars' })

// will be transpiled to 

connectResources({ namespace: 'cars', endpoint: 'cars' })
```

- dynamic endpoint
```javascript
connectResources({ namespace: 'car', endpoint: 'cars/:uuid' })

this.props.car.fetch({ uuid: 'tesla' })
this.props.car.post({ uuid: 'tesla', color: 'blue' })
```

:::caution

`endpoint` should not contain trailing slashes

:::

#### ~~forceUpdates~~
A boolean indicator that means that u do not need to store in redux filters, loading, and errors. This is common ussage for form submit actions, because [react-final-form](https://final-form.org/react) already handle all of this states and to avoid dublication of same data it is better to user `true`

#### ~~queries~~

Is an array of possible queary params. It is recommended to pass here all possible query params that are defined in your Swagger schema. 

Example:
```javascript
connectResources({ 
  namespace: 'cars',
  queries: ['offset', 'limit', 'search']
})
```

:::caution

It is important to define `queries` if you need to send HTTP request with query string.
Otherwise your get requests will be without filters even if you pass it to `fetch` function

```javascript
// Bad
connectResources({ namespace: 'cars' })

this.props.cars.fetch({ offset: 0, limit: 20 }) => will sent GET /users. offset and limit will be skipped

//Good
connectResources({ namespace: 'cars', queries: ['offset', 'limit'] })

this.props.cars.fetch({ offset: 0, limit: 20 }) => will sent GET /users?offset=0&limit=20

```

:::

:::tip

queryString will only work for GET requests. If you need to send HHTP a query string with what ever else HTTP request type, you need to pass queries once more as overrided meta.

For example `POST /cars?country=uk`

```javascript
connectResources({ namespace: 'cars', queries: ['country'] })

this.props.cars.create({ model: 1, color: 'red', year: 2020, country: 'uk' })

// will send POST to /cars with payload and country will be skipped from query string and passed to body


connectResources({ namespace: 'cars' })
this.props.cars.create({ model: 1, color: 'red', year: 2020, country: 'uk' }, { queries: ['country'] })

// will send POST to /cars?country=uk and in body you will have only model, color and year. country will be omitted
```

:::

#### ~~reducer~~

This is function that will be called in [redux reducer](https://redux.js.org/basics/reducers). Default `'object'`.
By default connect resources has already defined 4 types of most reusable reducers.
And you may use it as a String

```javascript
connectResources({ namespace: 'cars', reducer: 'object' })
connectResources({ namespace: 'cars', reducer: 'none' })
connectResources({ namespace: 'cars', reducer: 'replace' })
connectResources({ namespace: 'cars', reducer: 'paginationList' })
```

- ~~object~~
```javascript
function objectReducer(state, action){
  return { ...state, ...action.payload }
}
```

- ~~none~~
```javascript
function noneReducer(state, action){
  return state
}
```

- ~~replace~~
```javascript
function replaceReducer(state, action){
  return action.payload
}
```

- ~~replace~~
```javascript
function replaceReducer(state, action){
  return action.payload
}
```

- ~~paginationList~~
This is the most complex type of reducers that works for endpoint with list data types

```json
{
  count: 10,
  results: []
}
```
~~paginationList~~ is helpfull when you work with inifinity List like [FlatList](https://reactnative.dev/docs/flatlist) from React-Native. The basic idea of inifinity lists is that when u first enter the page you need to send GET request for first n rows and on scroll end send one more request to get next batch of data and join 2 array. Next propblem is inline editing. Working with infinity lists it important that you need some how to refresh particular item in infinity list and u can not refetch all list and refresh all data when user made changes in 1 item.

```javascript
// case action.payload is {count, results} => on scroll end
function replaceReducer(state, action){
  return {
    ...state,
    ...action.payload,
    results: [...state.results, action.payload.results ]
  }
}

// case action.payload is Object with item => on item update

function replaceReducer(state, action){
  return {
    ...state,
    ...action.payload,
    results: state.results.map(stateItem=>{
      if(stateItem.uuid === action.payload.uuid){
        return action.payload
      }
      return stateItem
    })
  }
}

```


:::caution

paginationList will only work with type of API responce
```json
{
  count: 10,
  results: []
}
```
Also to have replace item functionality you should have `uuid` as unique identificator of your item in list. This is hardcoded conditions.
To have your custom implementation please create your own reducer as a function

:::

- ~~custom reducer function~~
You may create your own logic for reducer. For example:

```javascript
function myReducer(stateData, payload){
  return { ...stateData, ... payload, count: stateData.count + 1 }
}
```

:::caution

Creating your own reducer, please pay attantion to [Redux Style Guide](https://redux.js.org/style-guide/style-guide)

:::


### ~~Several resources~~

To connect more than 1 resource into your React Component you may pass array of resource configs.

```javascript
connectResources([
  { namespace: 'cars' },
  { namespace: 'pets' }
])

function MyComponent({ cars, pets }){
  //than u will have 2 resources in 1 component
}
```

:::caution

Pay attantion that all resources should have unique namespace, otherwise it will just ovverride each other(

:::

:::caution

Pay that is it much better to split your code. That's why mostly it is not a good choice to use several resources in 1 React Component.

```javascript
// BAD
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

//Good

//withPets.js
export default connectResources({ namespace: 'pets' })

//withCars.js
export default connectResources({ namespace: 'cars' })

//Pets.js
import PetsView from './PetsView'
import withPets from './withPets'

export default withPets(PetsView)

//Cars.js
import CarsView from './CarsView'
import withCars from './withCars'

export default withCars(CarsView)


//CarsAndPetsPage.js
import Pets from './Pets'
import Cars from './Cars'

export default function CarsAndPetsPage(){
  return (
    <Fragment>
      <Pets/>
      <Cars/>
    </Fragment>
  )
}


```

:::

### ~~Simple syntax~~

As you may remember that [Resource](/frontend-docs/docs/resources/connect_resources#resource) object has only 1 required option (namespace), you can use more light syntax to define Resource as a String

```javascript
// several

connectResources(['cars', 'pets'])

// single

connectResources('cars')

// dynamic

connectResources('cars/:uuid') // you will have cars as namespace and cars/:uuid as endpoint

//camelcase

connectResources('cars/search') //carsSearch as a namespace

```


:::caution

Pay attantion that if you need just to add data from redux store to your React Component and you do not need any actions. It is better to use [connect](https://react-redux.js.org/api/connect) instead of resources.

:::