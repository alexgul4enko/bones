import get from 'lodash/get';
import { Reducers } from '../types';
import { none, object, infinityList, replace } from '../default-reducers';

const defaultReducers = {
  none,
  object,
  infinityList,
  replace
};

type StoreData =
  | {
      data?: any;
    }
  | null
  | undefined;

/*
 * function that will be used in reducer and run reducer function to change store data
 */
export function makeData(reducer: Reducers, state: StoreData, payload: any) {
  if (typeof reducer === 'function') {
    return reducer(get(state, 'data'), payload);
  }
  return defaultReducers[reducer](get(state, 'data'), payload);
}
