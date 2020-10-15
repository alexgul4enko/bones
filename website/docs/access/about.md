---
id: access_about
title: Access
sidebar_label: Ussage
---

React provider to define user permission levels and then use it to standardize conditional rendering.

## ~~Ussage~~

### ~~1. Define user permission levels~~
Firstly you need to create constances with user levels names. 
```javascript
export const F_PROTECTED = 'F_PROTECTED' 
export const F_UNAUTHORISED = 'F_UNAUTHORISED'
export const F_ADMIN = 'F_ADMIN'
export const F_SUPER_USER = 'F_SUPER_USER'
```

### ~~2. Describe user levels~~
To descripe permission rules you might need to use ~~composeAccess~~ function

```javascript
import { composeAccess } from '@cranium/access'

const acessLevels =  composeAccess(
  //if there is user id then user is authorized and has access to portal.
  (props) => get(props, 'session.data.id') ? F_PROTECTED : F_UNAUTHORISED,
  //define if user is admin
  (props) => get(props, 'session.data.is_admin') ? F_ADMIN : null,
  //define if user is super user
  (props) => get(props, 'session.data.is_super_user') ? F_SUPER_USER : null,
)
```

### ~~3. Create provider~~

Create your own provider and pass all props that are necessary to calculate user permission

```jsx
import { AccessProvider } from '@cranium/access'
import { useSelector } from 'react-redux'

function AppPermissions({ children, session }) {
  //as an example get user data from redux.
  const session = useSelector(state => state.session)
  return (
    <AccessProvider acessLevels={acessLevels} session={session}>
      {children}
    </AccessProvider>
  )
}
```

### ~~4. Wrap your app with AppPermissions~~

```jsx
function Root() {
  return (
    <AppPermissions>
      <App/>
    </AppPermissions>
  )
}
```

## ~~CheckAccess~~

### ~~Button that is visible only for admin user~~
```jsx
import { CheckAccess } from '@cranium/access'

function DeleteUSerButton() {
  return (
    <CheckAccess level={F_ADMIN}>
      <button>Delete user</button>
    </CheckAccess>
  )
}
```

### ~~Button that is visible only for admin user, otherwise link to become admin~~

```jsx
import { CheckAccess } from '@cranium/access'

function DeleteUSerButton() {
  return (
    <CheckAccess 
      level={F_ADMIN}
      fallback={(<Link to="become_admin">become admin</Link>)}
    >
      <button>Delete user</button>
    </CheckAccess>
  )
}

```

### ~~Button that is visible for both admin amd super user~~

```jsx
import { CheckAccess } from '@cranium/access'

function DeleteUSerButton() {
  return (
    <CheckAccess level=[F_ADMIN, F_SUPER_USER]>
      <button>Delete user</button>
    </CheckAccess>
  )
}

```

## ~~hasPermission~~

```jsx
import { hasPermission } from '@cranium/access'

function OnlyAdminUser() {
  return hasPermission(F_ADMIN) ? <HidenComponent/> : null
}

```

```jsx
import { hasPermission } from '@cranium/access'

function AdminAndSuperUser() {
  return hasPermission([F_ADMIN, F_SUPER_USER]) ? <HidenComponent/> : null
}

```

## ~~usePermissions~~

Hook to get and array of all permissions that has current user

```jsx
import { usePermissions } from '@cranium/access'

function AdminAndSuperUser() {
  const premissions =  usePermissions()
}

```




