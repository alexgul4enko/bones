---
id: resources-actions
title: Resource actions
sidebar_label: Resource actions
---

## useSetData

Hook that returns resource `setData` action. Accepts `namespace` string redux data key.
```ts
useSetData(namespace:string)
```

```js
import { useSetData } from '@cranium/resource'

function MyReactComponent () {
  const setData = useSetData('cars') 
  return <button onClick={()=>setData(null)}>clear data</button>
}
```


## useSetErrors

Hook that returns resource `setErrors` action. Accepts `namespace` string redux data key.
```ts
useSetErrors(namespace:string)
```

```js
import { useSetErrors } from '@cranium/resource'

function MyReactComponent () {
  const setErrors = useSetErrors('cats') 
  return <button onClick={()=>setErrors(null)}>clear errors</button>
}
```

## useSetFilters
Hook that returns resource `setFilters` action. Accepts `namespace` string redux data key.
```ts
useSetFilters(namespace:string)
```

```js
import { useSetFilters } from '@cranium/resource'

function MyReactComponent () {
  const setFilters = useSetFilters('reports') 
  return <button onClick={()=>setFilters({ offset: 2 })}>set filters</button>
}
```

## useSetLoading

Hook that returns resource `setLoading` action. Accepts `namespace` string redux data key.
```ts
useSetLoading(namespace:string)
```

```js
import { useSetLoading } from '@cranium/resource'

function MyReactComponent () {
  const setLoading = useSetLoading('cars') 
  return <button onClick={()=>setLoading(true)}>toggle loading</button>
}
```