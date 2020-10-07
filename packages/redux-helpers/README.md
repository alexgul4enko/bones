
# `@cranium/redux-helpers`
```
yarn add @cranium/redux-helpers
```

# redux  middleware for sync actions

Redux middleware that allows you to write action creators that return a function instead of an action. This middleware can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

An action creator that returns a function to perform asynchronous dispatch:

```
 const SET_DATA = "SET_DATA"
 //simple action
 function saveData(payload){
     return {
         type: SET_DATA,
         payload
     }
 }
 //async action
 function getData(){
     return function (dispatch, getState){
         fetch('some_endpoint')
            .then(response=>response.json())
            .then(data=>dispatch(saveData(data)))
     }
 }
 
 class Test extends React.Component {
     componentDidMount(){
        /*send HTTP request on mount 
         action will return promise by default for async actions
        */
         this.props.getData()
            .then(console.log)
            .catch(console.err)
     }
     componentWillUnmount(){
        //clear data on unmount
         this.props.saveData({})
     }
     
     render() {
         return <SomeWidget {...this.props}/>
     }
 }
 
 export default connect( ({ data })=>({ data }), { getData, saveData })
```

## Injecting a Custom Argument

```
const store = createStore(
  reducer,
  applyMiddleware(promisableActionMiddleware({ API })),
);

// action
function getData() {
  return function (dispatch, getState, { API }) {
    // you can use api here
  };
}
```

# Redux Helpers
## combineReducers(reducers)
Basically this is same combineReducers as in redux but it will not throw an error in case there will be some data in redux store that does not has appropriative reducer in  combineReducers. This could be helpfull with ds-resources when u don't know all possible values and this values are dynamically created by resources reducer.

#### usage

```
    function usersReducer (state = {}, action) {
        switch(action.type){
            case 'setUser':
                return action.payload
            default:
                return state
        }
    }
    
    function carsReducer (state = {}, action) {
        switch(action.type){
            case 'setCar':
                return action.payload
            default:
                return state
        }
    }
    
    const store = createStore(
      combineReducers({
          car: carsReducer,
          user: usersReducer
      }),
      applyMiddleware(promisableActionMiddleware({ API })),
    )
```
## composeReducers(initialState, ...reducers) 
In case your app should have several root reducers (reducers that could manipulate with whole store) u can use this helper function.
composeReducers takes initialState as firstArgument and your rootReducers as argumets

#### usage

```
 const store = createStore(
      composeReducers(
        {},
        combineReducers({
            car: carsReducer,
            user: usersReducer
        }),
        combineReducers({
            banking: bankingReducer,
            mortage: mortageReducer
        }),
      )
      applyMiddleware(promisableActionMiddleware({ API })),
    )
```
