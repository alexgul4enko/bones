---
id: use-resource-data
title: useResourceData
sidebar_label: useResourceData
---

Hook that returns Resource data. Accepts `namespace` string
```ts
useResourceData(namespace:string)
```
```js
import { useResourceData } from '@cranium/resource'

function MyReactComponent () {
  const { data, isLoading, errors, filters, options } = useResourceData('dogs') 
}
```
