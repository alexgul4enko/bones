---
id: router_with_router
title: withRouter
sidebar_label: withRouter
---

You can get access to the history object’s properties and the closest Route's match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders. Core value is that ~~withRouter~~ will use names instaed of url to handle history actions

```jsx
import { withRouter } from "@cranium/router"

function ShowTheLocation({ location, match, history }){
  return (
    <div>
      You are now at {location.pathname}
      <button onClick={()=>history.push("dashboard")}>open dashboard</button>
      <button onClick={()=>history.push("users", {name: "Test"})}>user Test</button>
      <button onClick={()=>history.push("users", {search: "?name=test"})}>open filters</button> 
      <button onClick={()=>history.push("users", {search: { name: 'test' }})}>open filters</button>    
    </div>
  )
}
```

