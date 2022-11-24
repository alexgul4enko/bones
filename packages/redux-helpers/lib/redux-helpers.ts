import get from 'lodash/get';

/*
 * function to compose nested reducers
 * this is usefull when u have more then 1 reducer to operate store data
 */

export function composeReducers(...args: any[]) {
  const [initialstate, ...reducers] = args;
  if (typeof initialstate !== 'object') {
    throw new Error('initialState should be an object');
  }
  if (reducers.find((reducer) => typeof reducer !== 'function')) {
    throw new Error('all reducers should be a functions');
  }

  return function mainReducer(state: any = initialstate, action: any) {
    return reducers.reduce(function (res, reducer) {
      return reducer(res, action);
    }, state);
  };
}

/*
 * function to combine nested reducers
 * this is same as combineReducers from react-redux
 * but it could work with dynamic store data
 */
export function combineReducers(reducers: any) {
  return function mainReducer(state: any = {}, action: any) {
    return Object.keys(reducers).reduce(
      (store, key) => ({
        ...store,
        [key]: reducers[key](get(state, key), action)
      }),
      state
    );
  };
}
