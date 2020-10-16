---
id: router_about
title: Router
sidebar_label: About
---

[React-router](https://reacttraining.com/react-router/web/guides/quick-start) 
 based navigation system that brings some new features: 
- Declare site navigatoin using JSON syntax
- Named routes and navigation by name
- Support layouts and whatever wrappers


## ~~Ussage~~

```jsx
import { Router } from '@cranium/router'

export default function App() {
  <Router routes={routes} notFountUrl="404"/>
}
```

```jsx
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
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/dashboard',
    routes: dashboard,
    name: 'dashboard',
  },
]
```


