---
id: resource_problem
title: Inspiration
sidebar_label: Inspiration
---

Working with REST-api and redux, using common practice, we always create almost same actions and reducers to send HTTP request to different endpoints. This will lead to problem that our projects will always have lot of duplicated code. For example:

```javascript
// action types
const FETCH_USERS_LIST = Symbol('FETCH_USERS_LIST')
const FETCH_USER = Symbol('FETCH_USER')
const SAVE_USER = Symbol('SAVE_USER')
const CREATE_USER = Symbol('CREATE_USER')

// action creators
function fetchUsersList() {
  return {
    type: FETCH_USERS_LIST
  }
}

function fetchUser(id) {
  return {
    type: FETCH_USER,
    payload: id,
  }
}

function saveUser(id, data) {
  return {
    type: SAVE_USER,
    payload: data,
    meta: {id}
  }
}

function createUser(data) {
  return {
    type: CREATE_USER,
    payload: data,
  }
}

// reducers
function users(state = {}, action) {
  switch(action.type) {
    case FETCH_USERS_LIST:
      return {...state, isLoading: true}
    case SAVE_USER:
      return {...state, ...action.payload, isLoading: false}
  }
}
```

This example does not contains error handling, loading, caching data, authorization, options, filters ... And basically we always copy paste this code from file to file and rename function names and constants values

```
fetchUsers
fetchBooks
fetchGroups
fetchComputers
fetchOrders
...
```

## ~~Normal flow~~

Normally working with HTTP requests we may need to have next flow:

1. Set loading flag and clear previous errors if exist
2. Sent Http request
3. Toggle loading flag, save responce (error or data). 
4. Save some meta data for example query string


## ~~REST GRUD~~

Resources is redux [middleware](https://redux.js.org/advanced/middleware) that helps you to keep working with [redux](https://redux.js.org/) with standard flow for async actions.
This module was build using [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) principles.

Common REST GRUD:

```
endpoint: /api/v1/users/:id?

GET      /api/v1/users/   - get users list
POST     /api/v1/users/   - create new user
GET      /api/v1/users/1  - get user details
PATCH    /api/v1/users/1  - update user
PUT      /api/v1/users/1  - recreate user
DELETE   /api/v1/users/1  - delete user
OPTIONS  /api/v1/users/   - get metadata
```

So in total we have 1 Model `User` and 7 possible options to work with this model.
Based on REST principles we can make universal url `/api/v1/users/:id?` to describe all possible flows. 
This url syntax will be compiled using [path-to-regex](https://www.npmjs.com/package/path-to-regex) that helps us to have 1 universal url for all possible actions.

So that now we have univarsal url and we can now use HTTP methods to describe what action do we need.






