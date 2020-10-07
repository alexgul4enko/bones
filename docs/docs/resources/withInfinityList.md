---
id: resource_withInfinityList
title: withInfinityList
sidebar_label: withInfinityList
---

This is function that will return HOC to work with infinity lists. 


## ~~API~~
```javascript
import { withInfinityList } from '@ds-frontend/resource'

withInfinityList(resource, options)
```


### ~~resource~~

This is [Resource](/frontend-docs/docs/resources/connect_resources#resource) object or String configuration.
The difference between all previous HOC's i that withInfinityList does not acceps several [Resource](/frontend-docs/docs/resources/connect_resources#resource) configs so that it can not be a array.
It could be also custoresource function.


### ~~options~~

Object with additional configurations

|  Property          |      type             |      Default  |
| -------------------| --------------------- | --------------|
|   [refresh](/frontend-docs/docs/resources/resource_prefetchResources#refresh)          | Boolean               | true          |
|   [destroyOnUnmount](/frontend-docs/docs/resources/resource_prefetchResources#destroyonunmount) | Boolean               | true          | 
|   [defaultParams](/frontend-docs/docs/resources/resource_prefetchResources#defaultparams)    | Object                | null          | 
|   [Loader](/frontend-docs/docs/resources/resource_prefetchResources#loader)           | React Element         |               | 
|   [prefetch](/frontend-docs/docs/resources/resource_withFinalForm#prefetch)          | Boolean        |        true       | 

## ~~Usage~~
~~withInfinityList~~ will pass 3 more additional props to your component:

### ~~loadNext~~ 
Function that could be used on scroll end.
This will automatically increment offset by limit and concat previos data with new batch of data.

:::caution

loadNext will only work with `offset` `limit` pagination type

:::
### ~~onRefresh~~ 
Function that could be to refresh page. In most case it is pull down to refresh.
This will automatically set offset to 0 and replace previous data in redux with new one
### ~~isRefreshing~~ 
Boolean indicator that shows if refresh is pending
### ~~onSearch~~ 
```
onSearch(filters)
```
onSearch is function to handle what ever filter requests.
This function has debounce 300 to have ability to use it for on air search.
Also pending search requests will be terminated on componet unmount and each next search request will terminate previous search request.

```javascript
import { withInfinityList } from '@ds-frontend/resource'

function InfinityListView ({
  cars,
  loadNext,
  onRefresh,
  isRefreshing,
  onSearch
}) {
  return (
    <Fragment>
      <TextInput onChangeText={(value) => onSearch({ search: value })}/>
      <FlatList
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
