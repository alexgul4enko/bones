---
id: resource_withInfinityList
title: withInfinityList
sidebar_label: withInfinityList
---

Function that returns HOC to work with infinity lists. 


```js
import { withInfinityList } from '@cranium/resource'

withInfinityList(resource, options)
```


`resource`

[Resource config](/docs/resources/connect_resource_type) or [Custom Resource](/docs/resources/resource_customresources)


`options`

Object with additional configurations. To read more visit this [link](/docs/resources/resource_prefetchResources#options) 

|  Property          |      type             |      Default  |
| -------------------| --------------------- | --------------|
|   [refresh](/docs/resources/resource_prefetchResources#refresh)          | Boolean               | true          |
|   [destroyOnUnmount](/docs/resources/resource_prefetchResources#destroyonunmount) | Boolean               | true          | 
|   [defaultParams](/docs/resources/resource_prefetchResources#defaultparams)    | Object                | null          | 
|   [Loader](/docs/resources/resource_prefetchResources#loader)           | React Element         |               | 
|   method          | 'GET' | POST        |        'GET'       | 
|   prefetch          | Boolean        |        true       | 

Most configurations are same with `prefetchResources`. But here is one new param `prefetch`

`prefetch` Boolean flag to configure if `withInfinityList` HOC needs to send initial API request.

```js
//GET /api/users on mount 
import { withInfinityList } from '@cranium/resource'

export default withInfinityList( 'users', {
  prefetch: true
})(ListView)
```

```js
//DO not send any GET requests on mount initial values are empty or defined with `initialValues` option
import { withFinalForm } from '@cranium/resource'

export default withFinalForm({}, 'users/me', {
  prefetch: false
})(FormViewComponent)
```

## Usage
**withInfinityList** will pass 3 more additional props to your component:

### `loadNext`
Function that could be used on scroll end.
This will automatically increment offset by limit and concatenates previous data with new batch of data.

:::caution

loadNext will only work with `offset` `limit` pagination type

:::
### onRefresh 
Function to refresh list data. In most case it is pull down to refresh.
This will automatically set offset to 0 and replace previous data in redux with new one
### isRefreshing
Boolean indicator that shows if refresh is pending
### onSearch 
```
onSearch(filters)
```
`onSearch` function to handle what ever filter requests.
This function has debounce 300 to have ability to use it for on air search.
Also pending search requests will be terminated on component unmount and each next search request will terminate previous search request.

```jsx
import { withInfinityList } from '@cranium/resource'

function InfinityListView ({
  cars,
  loadNext,
  onRefresh,
  isRefreshing,
  onSearch
}) {
  return (
    <Fragment>
      <input onChange={(e) => onSearch({ search: e.target.value })}/> //this will automatically setup offset to 0
      <List
        data={get(cars, 'data.results', [])}
        onEndReached={loadNext}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={YourItem}
        keyExtractor={yourKeyExtractor}
      />
    </Fragment>
  )
}
    
export default withInfinityList({
  namespace: 'cars',
  queries: ['offset', 'limit', 'search']
})(InfinityListView)

```
