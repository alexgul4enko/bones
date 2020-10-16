---
id: router_config
title: RouterConfig
sidebar_label: RouterConfig
---

Configuration object to pass custom logic to router configs

As an example you can add access logic to router configuration

```jsx
import { RouterConfig, Redirect, Router } from '@cranium/router'
import { CheckAccess } from '@cranium/access'
import routes from 'routes'

const configs = new RouterConfig()
configs.addInterceptor(
  function(props) {
    return props.access ? <CheckAccess level= {props.access} fallback={<Redirect to={props.accessRedirectTo }/>} >{props.children}</CheckAccess> : props.children
  }
)

export default function AppRouter(props) {
  return (
    <Router routes={routes} notFountUrl="404" configs={configs} />
  )
}
```

in this case u can use next configs:

```js
const appRoutes = [
  {
    path: '/',
    exact: true,
    name: 'root',
    redirectTo: 'dashboard',

  },
  {
    path: '/auth',
    routes: auth,
    access: access.F_UNAUTHORISED,
    accessRedirectTo: 'dashboard',
  },
  {
    path: '/dashboard',
    routes: dashboard,
    name: 'dashboard',
    access: access.F_PROTECTED,
    accessRedirectTo: 'auth',
  }
]
```

Where u will define access levels like only authorized users have access to portal ontherwise they will be redirected to sign-in page.
And othewise already authorized users can not have access to login page.
You can read more about Access [here](https://alexgul4enko.github.io/bones/docs/access/access_about)
