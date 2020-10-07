HOC to work with inifinity lists with filter functionality 
`withInfinityList(resources, options)`
#### `resources : String|Object|function` [required]
same as with prefetchResources but resources could not be an array it should be only a single resource
#### `options : Object` 
with options u can specify some configuration such as 
- `prefetch: Boolean [default true]` => whenever u need to send GET request on mount
- `refresh: Boolean [default true]` => if false component will not send GET request on mount if there is existing data in redux from previous component ussage
- `destroyOnUnmount: Boolean [default true]` => whenever u need to clear resource in redux on unmount
- `defaultParams: Object` => object with whatever default params that should be passed to initial|refresh|filter GET requests 
- `Loader: React Element [default Fragment]` => React element to should loader while fetching data
### usage
```
    function InfinityList ({
        cars,
        loadNext,
        onRefresh,
        isRefreshing,
        initialLoading,
        onSearch
    }) {
        return (
            <>
                <TextInput onChangeText={(value)=>onSearch({search: value})}/>
                <FlatList
                    data={get(cars, 'data.results', [])}
                    onEndReached={loadNext}
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    renderItem={YourItem}
                    keyExtractor={yourKeyExtractor}
                />
            </>
        )
    }
    
    export default withInfinityList({
      namespace: 'cars',
      queries: ['offset', 'limit', 'search']
    })
```

In this example there will be:
GET /cars?offset=0&limit=20 on Component mount.
GET /cars?offset=20&limit=20 on first scrollEnd event & autoincrement offset based on limit.
GET /cars?offset=0&limit=20&search=<inputValue> filer list and reinitialize offset to 0 each time filer changes. And same behaviour with setting up offset to 0 on pull down to refresh
