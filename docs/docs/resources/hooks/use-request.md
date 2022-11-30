---
id: use-request
title: useRequest
sidebar_label: useRequest
---

Hook that returns function for async actions.
This hook is also part of `resources` API. 

In case you don't need all data and actions (`data`, `isLoading`, `setData`, `errors`, `clear`...) that is provided by resource hooks, and you need just an action to send API request, you can use `useRequest` hook

## Configuration
```
useRequest(resource, type)
```

### resource
[Resource config](/docs/resources/connect_resource_type). Required

### type

HTTP request type. Default `GET`.
- GET
- POST
- PUT
- DELETE
- PATCH
...

## Usage

### GET request
```js
// GET /api/users/me
import { useRequest } from '@cranium/resource'

const resourceConfig = {
  endpoint: 'users/me',
  namespace: 'currentUser'
}

function MyReactComponent () {
  const fetchUser = useRequest(resourceConfig) 
  return <button onClick={()=>fetchUser()}>Get my data</button>
}
```

### POST request
```js
// POST /api/users
import { useRequest } from '@cranium/resource'

function MyReactComponent () {
  const createUser = useRequest('users', 'POST') 
  return <button onClick={()=>createUser({ name: 'James Bond' })}>Create user</button>
}
```

### PUT request
```js
// PUT /api/users/132
import { useRequest } from '@cranium/resource'

const resourceConfig = {
  endpoint: 'users/:uuid',
  namespace: 'user'
}

function MyReactComponent () {
  const updateUser = useRequest(resourceConfig, 'PUT') 
  return <button onClick={()=>updateUser({ name: 'James Bond', uuid: '132' })}>Update user</button>
}
```

### DELETE request
```js
// DELETE /api/users/132
import { useRequest } from '@cranium/resource'

const resourceConfig = {
  endpoint: 'users/:uuid',
  namespace: 'session',
  reducer: 'none'
}

function MyReactComponent () {
  const deleteUser = useRequest(resourceConfig, 'DELETE') 
  return <button onClick={()=>deleteUser({ uuid: '132' })}>Delete user</button>
}
```