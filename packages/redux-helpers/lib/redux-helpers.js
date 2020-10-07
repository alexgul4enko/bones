import get from 'lodash/get'

export function composeReducers(...args) {
  const [initialstate, ...reducers] = args
  if(typeof initialstate !== 'object') {
    throw new Error('initialState should be an object')
  }
  if(reducers.find(red => typeof red !== 'function')) {
    throw new Error('all reducers should be a functions')
  }

  return function mainReducer(state = initialstate, action) {
    return reducers.reduce(function(res, reducer) {
      return reducer(res, action)
    }, state)
  }
}

export function combineReducers(reducers) {
  return function mainReducer(state = {}, action) {
    return Object.keys(reducers).reduce((store, key) => ({
      ...(store || {}),
      [key]: reducers[key](get(state, key), action),
    }), state)
  }
}
