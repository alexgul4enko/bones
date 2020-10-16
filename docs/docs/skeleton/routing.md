---
id: skeleton_routing
title: Routing
sidebar_label: Routing
---

We use [react-router](https://reacttraining.com/react-router/web/guides/quick-start) to hanlde navigation for SPA projects.
But as react-router from version v4.x changed their API to use JSX React Component to describe navigation, we made own solution RouteRecursive, that helps to describe navigation using JSON syntax that is more suitable for roter based architecture and more easy to read and understand navigation. 

Most API is same as in react-router v3.x. Common idea is that u have JSON config with next properties:

|  Value             |      Type             |
| ------------------ | --------------------- |
|   path             | String|Array          |
|   exact            | Boolean               |
|   layout           | React Element         |
|   access           | Integer               |
|   accessRedirectTo | String                |
|   redirectTo       | String                |
|   component        | React Element         |
|   name             | String                |
|   routes           | Array                 |


## ~~path~~
Any valid URL path or array of paths that path-to-regexp@^1.7.0 understands. For more information you can read [here](https://reacttraining.com/react-router/web/api/Route/path-string-string)

## ~~exact~~
Flag that will check location for fully match with path. For more information you can read [here](https://reacttraining.com/react-router/web/api/Route/exact-bool)

## ~~redirectTo~~


## ~~routes~~

An array of nested routes

## ~~component~~
React Element to render for this route.

## ~~name~~
This is unique route identificator. It is common rule to use names for route and then you can use naviagtion by name instead of url path. This is common practice that helps you easy to rename url path without any impact on application work flow. Also beacuse of nested route configs, sometimes it is hard to build full path by your own and let it be automatically to avoid bugs.

:::caution

Always define `name` for routes and always use named Links and navigations to avoid bugs

:::


## ~~layout~~
Layout is a static content of application.
for exampe: 

---
<div class="adidas_auth">
    <img src="/img/adidas_1.png"/>
    <img src="/img/adidas_2.png"/>
</div>

---

In this example we have pages: Login and Register. Both screens have same header and same sidebar at the right part of screeen and footer. In this case it is better to define this component separate and name as Layout.

```jsx
function AuthLayout({ children }){
  return (
    <Fragment>
      <Header/>
      <Row>
        {children}
        <Sidebar/>
      </Row>
      <Fotter/>
    </Fragment>
  )
}

const routes = [
  {
    path: '/auth',
    layout: AuthLayout,
    routes: [
      {
        path: '/',
        exact: true,
        redirectTo: '/auth/login',
      },
      {
        path: '/login',
        component: LoginForm,
        name: 'login',
      },
      {
        path: '/register',
        component: Register,
        name: 'register',
      },
    ],
  },
]


```

## ~~access~~

Access level for route. For more information read [this](/bones/docs/skeleton/skeleton_access#page-level-access)

## ~~accessRedirectTo~~

Redirect url if user does not has permissions to view this page

# ~~Link~~

Overrides [Link](https://reacttraining.com/react-router/web/api/Link) component from react-router

- **to: String**. Instead of url  as in original Link Component, here you should use [name](/bones/docs/skeleton/skeleton_routing#name)
- **state: object**. State to persist to the location.
- **other props**

# ~~NavLink~~

Overrides [NavLink](https://reacttraining.com/react-router/web/api/NavLink) component from react-router

- **to: String**. Instead of url  as in original Link Component, here you should use [name](/bones/docs/skeleton/skeleton_routing#name)
- **state: object**. State to persist to the location.
- **other props**

# ~~withRouter~~
Overrides [withRouter](https://reacttraining.com/react-router/web/api/withRouter) HOC from react-router
You should use ovverides withRouter to have named navigation using push and replace actions

The difference between original actions is that you may use route name in path instead of original url.
Also u can use an object for search param and it will be automatically converted to query string.


Examples:

- simple Link

```javascript
import { Link } from 'common/router'

// Link to /auth/login page
<Link to="login"/>
```

- dynamic Link


```javascript
// router.js

export default {
  name: 'user',
  path: 'users/:uuid'
  component: UserPage
}

// ussage
import { NavLink } from 'common/router'

// Link to /users/test
<Navlink to="user" uuid="test"/>

```

- named navigation actions

```javascript
// router.js

export default {
  name: 'user',
  path: 'users/:uuid'
  component: UserPage
}

// ussage
import { withRouter } from 'common/router'

//navigate to /users/test?page=1
function navigate(history){
  return history.push(user, {
    uuid: 'test',
    search: {
      page: 1,
    }
  })
}

```
