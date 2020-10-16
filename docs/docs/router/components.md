---
id: router_components
title: Components
sidebar_label: Components
---

## ~~Router~~

Root router component to handle site navigation.

### routes [Array (Required)] 
JSON router config

### history [Instance of BrowserHistory] 
By default

```js
import { createBrowserHistory  } from 'history'
const history = createBrowserHistory()
```

### notFountUrl [String (Required)]

Name of page to render in case user will open not existing URL.

```jsx
import { Router } from '@cranium/router'

export default function App() {
  <Router routes={routes} notFountUrl="404"/>
}
```

```jsx
const appRoutes = [
  ...
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  ...
]
```

### configs [Instance of RouterConfig]

~~RouterConfig~~ is mostly used to pass some editional custom logic to router configs.

## ~~Link~~

Component that provides declarative, accessible navigation around your application. Has same props and API as react-router [Link](https://reactrouter.com/web/api/Link)

### to [String (Required)] 
Name of router to navigate

```jsx
<Link to="dashboard">Dashboard</Link>
//Dynamic url  (when user route has url /user/:name)
<Link to="user" name="test">Dashboard</Link> 
//will generate:
<a href="/user/test">Dashboard</a>
```
### search [String | Object] 

Query string
```jsx
<Link to="dashboard" search="?name=test">Dashboard</Link>
//will generate:
<a href="/dashboard?name=test">Dashboard</a>
```
In case search is an Object. It will automatically converted to Querystring using [queryParams](https://alexgul4enko.github.io/bones/docs/queryParams/queryParams_about)

```jsx

function DashboardLink() {
  return (
    <Link 
        to="dashboard"
        search={{ name: 'test' }}
    >
        Dashboard
    </Link>
  )
}
//will generate:
<a href="/dashboard?name=test">Dashboard</a>
```
### state [Object]

State to persist to the location.

### component [React.Component]
If you would like utilize your own navigation component, you can simply do so by passing it through the component prop.


## ~~NavLink~~

A special version of the ~~Link~~ that will add styling attributes to the rendered element when it matches the current URL.

### activeClassName [String] 
The class to give the element when it is active. The default given class is active. This will be joined with the className prop.

```jsx
<NavLink to="faq" activeClassName="selected">
  FAQs
</NavLink>
```


### activeStyle [Object] 
The styles to apply to the element when it is active.

```jsx
<NavLink
  to="faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  FAQs
</NavLink>
```

### exact [Boolean]

When true, the active class/style will only be applied if the location is matched exactly.

### strict [Boolean]

When true, the trailing slash on a location’s pathname will be taken into consideration when determining if the location matches the current URL.

### isActive [func]

A function to add extra logic for determining whether the link is active. This should be used if you want to do more than verify that the link’s pathname matches the current URL’s pathname.

```jsx
<NavLink
  to="/events/123"
  isActive={(match, location) => {
    if (!match) {
      return false;
    }
    const eventID = parseInt(match.params.eventID);
    return !isNaN(eventID) && eventID % 2 === 1;
  }}
>
  Event 123
</NavLink>
````

### aria-current [String]

The value of the aria-current attribute used on an active link. Available values are:

- "page" - used to indicate a link within a set of pagination links
- "step" - used to indicate a link within a step indicator for a step-based process
- "location" - used to indicate the image that is visually highlighted as the current component of a flow chart
- "date" - used to indicate the current date within a calendar
- "time" - used to indicate the current time within a timetable
- "true" - used to indicate if the NavLink is active

Defaults to "page".

## ~~Redirect~~

Rendering a ~~Redirect~~ will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do. Has same API as react-router [Redirect](https://reactrouter.com/web/api/Redirect)

### to [String (Required)] 
Name of router to navigate
```
<Redirect to="/dashboard" />
```

