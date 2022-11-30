---
id: resource_rewrite
title: Change Resource Config
sidebar_label: Change Resource Config
---

While using `resources` you need to define [`Resource config`](/docs/resources/connect_resource_type). But what if you need to change some configuration.

In this case all actions: [`fetch`](/docs/resources/connect_resources#get-request), [`fetchOptions`](/docs/resources/connect_resources#options-request), [`create`](/docs/resources/connect_resources#post-request), [`remove`](/docs/resources/connect_resources#delete-request), [`replace`](/docs/resources/connect_resources#put-request), [`update`](/docs/resources/connect_resources#patch-request), [`setData`](/docs/resources/connect_resources#setdata), [`setLoading`](/docs/resources/connect_resources#setloading), [`setErrors`](/docs/resources/connect_resources#seterrors), [`setFilters`](/docs/resources/connect_resources#setfilters), [`clear`](/docs/resources/connect_resources#clear-resource-data-clear) accepts second argument with [Resource config](/docs/resources/connect_resource_type) type to overwrite default values

```ts
customRequest(payload: any, meta: ResourceType)
fetch(payload: any, meta: ResourceType)
fetchOptions(payload: any, meta: ResourceType)
create(payload: any, meta: ResourceType)
replace(payload: any, meta: ResourceType)
update(payload: any, meta: ResourceType)
remove(payload: any, meta: ResourceType)
setData(payload: any, meta: ResourceType)
setLoading(payload: boolean, meta: ResourceType)
setErrors(payload: any, meta: ResourceType)
setFilters(payload: any, meta: ResourceType)
clear(meta: ResourceType)
```

```js
import { connectResources } from '@cranium/resource'

function MyComponent({ users }) {
  const { 
    fetch,
    data, 
    setData, 
    clear,
    setData,
    setErrors,
    setLoading
   } = users

   //GET /api/cars?offset=0&limit=12 and store data under cars namespace
   fetch({ offset: 0, limit: 12 }, { namespace: 'cars', endpoint: 'cars', queries: ['offset', 'limit'] })

   // clear data under reports namespace
   clear({ namespace: 'reports' })

   //change data under user namespace
   setData({ age: 12 }, { namespace: 'user' })

   //set errors under profile namespace
   setErrors('Email is invalid', { namespace: 'profile' })
  
   //set loading true under pets namespace
   setLoading(true, { namespace: 'pets' })

   //POST image-position and do not change any data in avatar, because of reducer: 'none', forceUpdate: true
   create({ position: 'left' }, { namespace: 'avatar', endpoint: 'image-position', reducer: 'none', forceUpdate: true })
}
export default connectResources('users')(MyComponent)
```

:::info

Please pay attention, in case you overwrite `namespace` than actions will not have any impact on current data. 

So `data`, `filters`, `errors`, `isLoading`, `options` in current Component will not change.

Basically it is powerful ability to control another components from current without connecting their data. But you need to be very careful using this mechanism because it could be really tricky solution that will hard to debug :)

:::