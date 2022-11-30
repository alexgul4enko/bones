---
id: use-resource-usage
title: useResource
sidebar_label: useResource (usage)
---

# useResource

Basic hook for sending REST API from within React Component. 

```ts
useResource( config: ResourceConfig )
```

## Basic usage

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const {
        data,            // body from success HTTP request
        isLoading,       // boolean flag that fill be automatically toggle while using fetch|fetchOptions|create|update|remove actions
        options,         // body from success OPTIONS HTTP request
        errors,          // errors from HTTP request
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
        clear,           // action to delete all resource:  data,isLoading,options,errors,filters
    } = useResource(resourceConfig)
}
```

## GET request

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { data, isLoading, errors, fetch } = useResource(resourceConfig)
    //send GET /api/users Request on mount
    useEffect(() => { fetch() },[])
    if(isLoading){
        return <p>Loading</p>
    }
    if(errors){
        return <p>Oooops...</p>
    }
    if(data) {
        return <p>{data}</p>
    }
}
```

## OPTIONS request

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}

function MyReactComponent () {
    const { options, isLoading, errors, fetchOptions } = useResource(resourceConfig)
    //send OPTIONS /api/users Request on mount
    useEffect(() => { fetchOptions() },[])
    if(isLoading){
        return <p>Loading</p>
    }
    if(errors){
        return <p>Oooops...</p>
    }
    if(options) {
        return <p>{options}</p>
    }
}
```

## DELETE request

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users/:uuid',
}

function MyReactComponent () {
    const { isLoading, errors, remove } = useResource(resourceConfig)
    const deleteUser = useCallback(()=>{ 
        // DETETE /api/users/21
        remove({ uuid: 21 })
            //handle success
            .then(() => alert('success'))
            ////handle errors
            .catch((error) => alert(error))
    },[remove])

    return (
        <>
            <button
                onClick={deleteUser}
                //disable button while sending HTTP Request
                disabled={isLoading}
            >
                Delete
            </button>
            //show errors
            {errors && <p>{errors}</p>}
        </>
    )
}
```

## POST request

### type application/json
```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}

function MyReactComponent () {
    const { isLoading, errors, create } = useResource(resourceConfig)

    const handleSubmit = useCallback((event)=>{ 
        event.preventDefault()
        const formdata = new FormData(event.target);
        //POST /api/users
        create({
            email: data.get('email'),
            password: data.get('email'),
        })
            //handle success
            .then(() => alert('success'))
            ////handle errors
            .catch((error) => alert(error))
    },[create])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="email"/>
                <input name="password"/>
                <button type="submit" disabled={isLoading}>Submit</button>
                <button type="reset" disabled={isLoading}>Reset</button>
                {errors && <p>{errors}</p>}
            </form>
        </>
    )
}
```
### type formdata

:::tip

Please note, that in case there is an instance of File in your request payload, `resource` module will automatically converd Request body to Formdata.

:::

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'avatar',
    endpoint: '/image-upload',
}

function MyReactComponent () {
    const [value, setValue] = useState()
    const { isLoading, errors, create } = useResource(resourceConfig)

    const handleChange = useCallback((event) => setValue(event.target.value))

    const handleSubmit = useCallback((event)=>{ 
        event.preventDefault()
        //POST /api/image-upload
        create({ file: value })
            //handle success
            .then(() => alert('success'))
            ////handle errors
            .catch((error) => alert(error))
    },[create, value])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="email" type="file" onChange={handleChange} value={value}/>
                <button type="submit" disabled={isLoading}>Submit</button>
                <button type="reset" disabled={isLoading}>Reset</button>
                {errors && <p>{errors}</p>}
            </form>
        </>
    )
}
```

### Dynamic URL and query params

You can pass the `filters` object as a second argument in `create`, `update`,  `replace` actions to send API with dynamic URL and query params

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users/:city',
}

function MyReactComponent () {
    const { isLoading, errors, create } = useResource(resourceConfig)

    const createUser = useCallback(() => {
        //Post /api/users/NY?galaxy=FG-123 body: { name: 'Avatar' }
        create(
            //POST request body
            { name: 'Avatar' },
            {
                filters: {
                    //URL param
                    city: 'NY',
                    //Query param
                    galaxy: 'FG-123'
                }
            }
        )
    }, [create])

    return ( <button onClick={createUser}>Create user</button>)
}
```

## PATCH request

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users/:uuid',
}

function MyReactComponent () {
    const { isLoading, errors, update } = useResource(resourceConfig)

    const handleSubmit = useCallback((event)=>{ 
        event.preventDefault()
        const formdata = new FormData(event.target);
        //PATCH /api/users/23
        update({ email: data.get('email'), uuid: 23 })
            //handle success
            .then(() => alert('success'))
            ////handle errors
            .catch((error) => alert(error))
    },[update])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="email"/>
                <button type="submit" disabled={isLoading}>Submit</button>
                <button type="reset" disabled={isLoading}>Reset</button>
                {errors && <p>{errors}</p>}
            </form>
        </>
    )
}
```

## PUT request

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users/:uuid',
}

function MyReactComponent () {
    const { isLoading, errors, replace } = useResource(resourceConfig)

    const handleSubmit = useCallback((event)=>{ 
        event.preventDefault()
        const formdata = new FormData(event.target);
        //PUT /api/users/23
        replace({ email: data.get('email'), uuid: 23 })
            //handle success
            .then(() => alert('success'))
            ////handle errors
            .catch((error) => alert(error))
    },[replace])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="email"/>
                <button type="submit" disabled={isLoading}>Submit</button>
                <button type="reset" disabled={isLoading}>Reset</button>
                {errors && <p>{errors}</p>}
            </form>
        </>
    )
}
```

## Request with dynamic URL

You can use dynamic URL sintax to specify API endpoint.

:::note

After each API call `resource` module will store URL params from the latest API call in `filters` object

:::

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'cars',
    // dynamic URL where model is required and action is optional
    endpoint: '/cars/:model/:action?',
}
function MyReactComponent () {
    const { fetch, create, filters } = useResource(resourceConfig)

    //GET '/api/cars/cactus'
    useCallback(() => fetch({ model: 'cactus' }))

    //GET '/api/cars/cactus/buy'
    useCallback(() => fetch({ model: 'cactus', action: 'buy' }))

    //POST '/api/cars/cactus' { price: 12000 }
    useCallback(() => create({ model: 'cactus', price: 12000 }))

    //POST '/api/cars/cactus/sell' { price: 16000 }
    useCallback(() => create({ model: 'cactus', action: 'sell' price: 16000 }))

    return {
        <>
            <p>URL params requests</p>
            <p>{JSON.stringify(filters)}</p>
        </>
    }
}
```

## Request with query params


:::info

To send HTTP requests with query params you need to define all possible queries that will be used using `queries` configuration
:::

:::caution

All other data that is not described in `queries` resourceConfig will be omited

:::

:::note

After each API call `resource` module will store query params from the latest API call in `filters` object

:::

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'globalData',
    endpoint: 'context',
    queries: ['accountId', 'keys']
}
function MyReactComponent () {
    const { fetch, create, filters } = useResource(resourceConfig)

    //GET /api/context
    useCallback(() => fetch())

    //GET /api/context?accountId=14
    useCallback(() => fetch({ accountId: 14 }))

    //GET /api/context?accountId=14&keys=PERMISSIONS
    useCallback(() => fetch({ accountId: 14, keys: 'PERMISSIONS' }))

    //GET /api/context?accountId=14&keys=PERMISSIONS,ROLES
    useCallback(() => fetch({ accountId: 14, keys: ['PERMISSIONS', 'ROLES'] }))

    //GET /api/context
    useCallback(() => create({ missed: 'test', price: 0 }))

    return {
        <>
            <p>Filters from latest requests</p>
            <p>{JSON.stringify(filters)}</p>
        </>
    }

}
```

## Modify data

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { data, setData } = useResource(resourceConfig)
    // modify data
    useCallback(() => setData({ test: 'data'}))
    useCallback(() => setData('Test'))
    useCallback(() => setData(null))
    useCallback(() => setData(false))
}
```

## Modify loading

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { isLoading, setLoading } = useResource(resourceConfig)
    // modify isLoading
    useCallback(() => setLoading(true))
    useCallback(() => setLoading(false))
}
```

## Modify errors

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { errors, setErrors } = useResource(resourceConfig)
    // modify errors
    useCallback(() => setErrors({ test: 'data'}))
    useCallback(() => setErrors('Test'))
    useCallback(() => setErrors(null))
    useCallback(() => setErrors(false))
}
```

## Modify filters

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { filters, setFilters } = useResource(resourceConfig)
    // modify filters
    useCallback(() => setFilters({ test: 'data'}))
    useCallback(() => setFilters('Test'))
    useCallback(() => setFilters(null))
    useCallback(() => setFilters(false))
}
```

## Clear data on unmount

:::note

`resource` module uses Redux global state managment. When you call some action for the first time it will create new item in Redux store with key that is equal to `namespace` from resourceConfig. So that it is hight recomended to clear you Component data on unmount to keep global store clean.

:::

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { fetch, clear } = useResource(resourceConfig)
    
    useEffect(()=>{
        //GET /api/users on Mount
        fetch()
        // clear users data on unmount
        return clear
    },[])
}
```

## Change resource configs

It is required to pass initial configuration to `resource` module, but it is just initial, default config and you can change it.

### fetch config
```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { fetch } = useResource(resourceConfig)
    //GET /api/users
    const getUsers = useCallback(() => fetch())
    //GET /api/users/12 and change current resource data
    const getUsers = useCallback(() => fetch({ uuid: 12 }, { endpoint: '/users/:uuid' }))
    //GET /api/users/12 and change another resource data
    const getUsers = useCallback(() => fetch({ uuid: 12 }, { endpoint: '/users/:uuid', namespace: 'profile' }))
}
```

### remove config
```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { remove } = useResource(resourceConfig)
    //DELETE /api/users
    const deleteUser = useCallback(() => remove())
    //DELETE /api/users/12
    const deleteUser = useCallback(() => remove({ uuid: 12 }, { endpoint: '/users/:uuid', reducer: 'none' }))
    //DELETE /api/v2/users/12 and change another resource data
    const deleteUser = useCallback(() => remove({ uuid: 12 }, { endpoint: '/users/:uuid', namespace: 'profile', baseUrl: '/api/v2/' }))
}
```

### create config
```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users',
}
function MyReactComponent () {
    const { remove } = useResource(resourceConfig)
    //POST /api/users
    const createUser = useCallback(() => create({ name: 'Alex' }))
    //POST /api/users/12
    const createUser = useCallback(() => remove({ uuid: 12, name: 'Alex' }, { endpoint: '/users/:uuid' }))
    //POST /api/v2/users/12 and change another resource data
    const createUser = useCallback(() => remove({ uuid: 12, name: 'Alex' }, { endpoint: '/users/:uuid', namespace: 'profile', baseUrl: '/api/v2/' }))
}
```

### setData config

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
}

function MyReactComponent () {
    const { data, setData } = useResource(resourceConfig)
    //change current resource data
    const setUsers = useCallback(() => setData([{ name: 'Alex' }]))
    //change "profile" resource data, current data will not changed
    const setUsers = useCallback(() => setData({ name: 'Alex' }, { namespace: 'profile' }))
    //change "profile" resource data, current data will not changed (simple syntax)
    const setUsers = useCallback(() => remove({ name: 'Alex' }, 'profile'))
    //change "profile" resource data, current data will not changed
    const setUsers = useCallback(() => remove({ name: 'Alex' }, { namespace: 'profile', reducer: 'object' }))
}
```

:::tip

Same syntax will be for `setLoading`, `setErrors`, `setFilters`

:::

### clear another resource

```jsx
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
}

function MyReactComponent () {
    const { clear } = useResource(resourceConfig)
    //clear current resource
    const clearResource = useCallback(() => clear())
    //clear current "profile" resource
    const clearResource = useCallback(() => clear('profile'))
}
```

## terminate requests

By default all async actions (fetch, fetchOptions, create, replace, update, remove ) will return Promise with 1 more method `cancel`. You can use this method to abort HHTP requests

```jsx {16,17}
import { useResource } from '@cranium/resource'

const resourceConfig = {
    namespace: 'users',
    endpoint: '/users'
}

function MyReactComponent () {
    const { fetch } = useResource(resourceConfig)
    
    useEffect(()=>{
        const request = fetch()
        fetch
            .then(()=>alert('success'))
            .catch(()=>alert('error'))
        //abort HHTP request on unmount
        return () => request.cancel()
    },[])
}
```
