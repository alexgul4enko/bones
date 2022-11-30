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

```js title="acessLevels.ts"
import { composeAccess } from '@cranium/access'
import get from 'lodash/get'

export const acessLevels =  composeAccess(
  //if there is user id then user is authorized and has access to portal.
  (props) => get(props, 'user.id') ? F_PROTECTED : F_UNAUTHORISED,
  //define if user is admin
  (props) => get(props, 'user.is_admin') ? F_ADMIN : null,
  //define if user is super user
  (props) => get(props, 'user.is_super_user') ? F_SUPER_USER : null,
)
```

### ~~3. Create provider~~

Create your own provider and pass all props that are necessary to calculate user permission

```jsx
import { AccessProvider } from '@cranium/access'
import { acessLevels } from './acessLevels.ts'

function AppPermissions({ children, session }) {
  //as an example your local Hook to get user info
  const user = useGetUserInfo()
  return (
    <AccessProvider acessLevels={acessLevels} user={user}>
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

React Component that wraps nested components and renders children only in case user has permissions to view it, based on ~~access levels~~

Props:

- ~~access [string, string[]]~~. Access level or list of access levels to check.
- ~~fallback [ReactNode]~~. Element to render in case user does not has sccess level. Default `null`
- ~~operator ['ALL' | 'SOME']~~. Operator to controll multiple access level rules. `ALL` user needs to have all access levels, `SOME` - at least 1. Default `SOME`.

### ~~Button that is visible only for admin user~~
```jsx
import { CheckAccess } from '@cranium/access'

function DeleteUSerButton() {
  return (
    <CheckAccess access={F_ADMIN}>
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
      access={F_ADMIN}
      fallback={(<Link to="become_admin">become admin</Link>)}
    >
      <button>Delete user</button>
    </CheckAccess>
  )
}

```

### ~~Button that is visible for both admin or super user~~

```jsx
import { CheckAccess } from '@cranium/access'

function DeleteUSerButton() {
  return (
    <CheckAccess access={[F_ADMIN, F_SUPER_USER]}>
      <button>Delete user</button>
    </CheckAccess>
  )
}

```

### ~~Button that is visible for super admin user~~

```jsx
import { CheckAccess } from '@cranium/access'

function DeleteUSerButton() {
  return (
    <CheckAccess access={[F_ADMIN, F_SUPER_USER]} operator="ALL">
      <button>Delete user</button>
    </CheckAccess>
  )
}

```

## ~~useHasAccess~~

React HOOK to check  permissions based on ~~access levels~~

API:

- ~~acessLevels [string, string[]]~~. Access level or list of access levels to check.
- ~~operator ['ALL' | 'SOME']~~. Operator to controll multiple access level rules. `ALL` user needs to have all access levels, `SOME` - at least 1. Default `SOME`.

```ts
useHasAccess(acessLevels: string | string[], operator: 'ALL' | 'SOME' = 'SOME'): boolean
```

```jsx
import { useHasAccess } from '@cranium/access'

function OnlyAdminUser() {
  return useHasAccess(F_ADMIN) ? <HidenComponent/> : null
}

```

```jsx
import { useHasAccess } from '@cranium/access'

function AdminOrSuperUser() {
  return useHasAccess([F_ADMIN, F_SUPER_USER]) ? <HidenComponent/> : null
}

```

```jsx
import { useHasAccess } from '@cranium/access'

function AdminAndSuperUser() {
  return useHasAccess([F_ADMIN, F_SUPER_USER], 'ALL') ? <HidenComponent/> : null
}

```

## ~~usePermissions~~

React HOOK that return Set of all AccessLevels

```jsx
import { usePermissions } from '@cranium/access'

function AdminAndSuperUser() {
  const premissions =  usePermissions()
}

```




