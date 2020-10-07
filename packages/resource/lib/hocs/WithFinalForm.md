HOC that will connect react-final-form and resource with prefetch functionality, adding prefetched data as initialValues and sending POST/PUT request based on if it is new object or updating existing one

`withFinalForm(form, resources, options)`
#### `form : Object` [required] 
react-final-form configs
- `validate: function(values, props):Object|Promise` => with react final form u can use  validate function  for sunc and async validation. 
- `onSubmitSuccess: function(apiResults, props)` => callback functoin on Submit success
- `onSubmitFailed: function(apiError, props)` => callback functoin on Submit fails
- `valuesInterceptor: function(values, props, form)` => functoin interceptor to convert form data before submit
- `initialValues: Object|function(props)` => same as redux-form initialValues but it could be a function where u can modify initialValues from props. Or U can specify initialValues as static values.
in case nothing was specified and prefetch true it will pass resource data by default as initial values
... rest configurations from react-final-form

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
withFinalForm(
  { validate: <validate function>},
  resource: {
    namespace: 'user',
    endpoint: 'users/:uuid?', //uuid will be retrived from navigation params
  }
)
```
