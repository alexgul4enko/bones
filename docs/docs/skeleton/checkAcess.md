---
id: skeleton_access
title: Access levels
sidebar_label: Access levels
---

In most cases you will have access levels in what ever React app. To handle access levels you can use build in access module.
Code for this module you can find in `common/session` folder.


## ~~CheckAccess~~

React component for condition rendering

Props: 

|  Property       |      type             |      Description      |
| --------------- | --------------------- | --------------------- |
|   access        | Integer               | Acess Level           |
|   fallback      | React Element         | React Componet to render if condition is `false`           |


Usage:

```jsx
import { access, CheckAccess } from 'common/session'

function ConditionalElement(){
  return (
    <CheckAccess access={access.F_PROTECTED}>
      <UserLogo/>
    </CheckAccess>
  )
}
```

```jsx
import { access, CheckAccess } from 'common/session'

function ConditionalElement(){
  return (
    <CheckAccess 
      access={access.F_PROTECTED}
      fallback={<DefaultAvatar />}
    >
      <UserLogo/>
    </CheckAccess>
  )
}
```

## ~~Page level access~~

[RouteRecursive](/frontend-docs/docs/skeleton/skeleton_routing) also uses CheckAccess to set up page level access level you can use a pair of configs `access` and `accessRedirectTo`

Usage:

```javascript
[
  {
    path: '/auth',
    routes: auth,
    access: access.F_UNAUTHORISED,
    accessRedirectTo: '/dashboard',
  },
  {
    path: '/dashboard',
    routes: dashboard,
    access: access.F_PROTECTED,
    accessRedirectTo: '/auth',
    name: 'dashboard',
  },
]
```

This is common example of authorisation flow, when if user is already loged-in he does not have permissions to visit login page, so that he will be redirected to `/dashboard`. And vice versa, not authorised user does not has permissions to your application.


## ~~Define new access level~~

By default this module has 3 access levels:

|  Value             |      Description      |
| ------------------ | --------------------- |
|   F_PUBLIC         | Public access         |
|   F_PROTECTED      | Authorised user       |
|   F_UNAUTHORISED   | Not authorised user   |

To define your own access level you can use `common/session/access.js` file.

Steps:

1. Define new access level

```javascript
export const F_ADMIN_USER = 2 ** 3
```

2. Creat selector

```javascript
export const userLevelSelector = createSelector(
  // base permissions
  (state) => isEmpty(get(state, 'session.data.token')) ? F_UNAUTHORISED : F_PROTECTED,
  (state) => get(state, 'session.user.role') === 'admin' ? F_ADMIN_USER : 0,

  // collect all user permissions
  (...args) => args.reduce((level, flag) => level | flag, F_PUBLIC)
)
```
