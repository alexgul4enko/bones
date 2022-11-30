---
id: use-clear
title: useClear
sidebar_label: useClear
---

Hook that returns resource `clear` action. Accepts `namespace` string.
`clear` action will remove all data that was stored using coresponding `namespace`.

```ts
useClear(namespace:string)
```

```js
import { useClear } from '@cranium/resource'

function MyReactComponent () {
  const clear = useClear('dogs') 
  return <button onClick={clear}>remove dogs data</button>
}
```