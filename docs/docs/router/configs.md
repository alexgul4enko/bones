---
id: router_configs
title: Configs
sidebar_label: Configs
---

### ~~name~~ [String]
Name of router url that than will be used to handle navigation

### ~~component~~ [React element]
A React component to render only when the location matches. It will be rendered with [route props](https://reactrouter.com/react-router/web/api/Route/route-props).

When you use component (instead of render or children, below) the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component prop, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component. When using an inline function for inline rendering, use the render or the children prop (below)

### ~~path~~ [String, String[]]
Any valid URL path or array of paths that [path-to-regexp](https://github.com/pillarjs/path-to-regexp) understands.

*Note:
for nesting routes it will automatically concat (child + parent) urls

```js
const appRoutes = [
  {
    path: '/auth',
    routes: [
      {
        path: '/login'  // will be computed to /auth/login
        component: Login
      }
    ],
  },
]
```
Dynamic routes
```js
const appRoutes = [
  {
    path: '/user/:name',
    component: User
  },
]
```

### ~~exact~~ [Boolean]

When true, will only match if the path matches the location.pathname exactly.

### ~~strict~~ [Boolean]

When true, a path that has a trailing slash will only match a location.pathname with a trailing slash. This has no effect when there are additional URL segments in the location.pathname.

### ~~sensitive~~ [Boolean]

When true, will match if the path is case sensitive.

### ~~redirectTo~~ [String]

Name of router to redirect.
If define this property it will render [Redirect](https://reactrouter.com/web/api/Redirect) as a Component. 

Mostly uses in root configuration to redirect user from root url to your app base route

```js
const appRoutes = [
  {
    path: '/',
    exact: true,
    name: 'root',
    redirectTo: 'dashboard',

  },
  {
    path: '/dashboard',
    routes: dashboard,
    name: 'dashboard',
  },
]
```

### ~~routes~~ [Array]

Array of nested route configs

### ~~layout~~ [React element]

React element that will wrapp all nested routes or components.







