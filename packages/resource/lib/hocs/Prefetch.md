## prefetchResources
A Height Order Component that will send Get Request on ComponentDidMount and, in case this request will be still pending,  terminate this request on ComponentWillUnmount. Also prefetch resource will use navigator params and queryparams from routeer by default.
`prefetchResources(resources, options)`
#### `resources : String|Object|function|Array` [required]
- resources could be a String. In this case it will connect resource with `endpoint` and `namespace` that are equal to resources(String)
- resources could be an Object. In this case this thould be configurations object for resources
- resources could be a function. In case this is a function it should be a HOC that returns from `customResource` function. In this case HOC will send custom request on ComponentDidMount instead of using standard fetch
- resources could be an array of whatever previous posibble values
#### `options : Object` 
- `refresh: Boolean [default true]` => if false component will not send GET request on mount if there is existing data in redux from previous component ussage
- `destroyOnUnmount: Boolean [default true]` => whenever u need to clear resource in redux on unmount
- `defaultParams: Object` => object with whatever default params that should be passed to initial|refresh|filter GET requests 
- `Loader: React Element [default Fragment]` => React element to should loader while fetching data

### usage
```
  // GET /users
  prefetchResources('users') 
  
  // GET /users/me
  prefetchResources({
    namespase: 'user',
    endpoint: 'users/:uuid'
  }, {
      defaultParams: {
        uuid: 'me'
      }
  }) 
  // run MyAsincFunction
  const customConnect = customResource(MyAsincFunction)
  prefetchResources(customConnect('custom'))
  //All together
  prefetchResources([
    'users',
    customConnect('custom'),
    {
      namespase: 'user',
      endpoint: 'users/:uuid'
    },
  ],{
    defaultParams: { uuid: 'me' }
  })
  
  //if you need to get some initial data that depends on someother data from redux-store
  
  compose(
    connect(state=>({
       ord_uuid: state.user.organization  
    })),
    prefetchResources({
        namespace: 'userOrg',
        endpoint: 'organizations/:ord_uuid'
    })
  )
```