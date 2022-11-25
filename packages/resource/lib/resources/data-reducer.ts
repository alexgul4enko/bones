import { makeData } from './utils';
import get from 'lodash/get';
import { Method } from '../types';
import { Reducers } from './types';
import pick from 'lodash/pick';
import { SET_ERRORS, SET_FILTERS, SET_LOADING, SET_RESOURCE_DATA, SET_DATA } from './actions';

const dataKeys = {
  [SET_ERRORS]: 'errors',
  [SET_FILTERS]: 'filters',
  [SET_LOADING]: 'isLoading'
};

interface State {
  data?: any;
  errors?: any;
  isLoading?: boolean;
  filters?: Record<string, any>;
  options?: any;
}

export type Action =
  | {
      type: typeof SET_LOADING;
      payload: boolean;
    }
  | {
      type: typeof SET_FILTERS;
      payload: Record<string, any> | null | undefined;
    }
  | {
      type: typeof SET_ERRORS;
      payload: any;
    }
  | {
      type: typeof SET_RESOURCE_DATA;
      payload?: State;
    }
  | {
      type: typeof SET_DATA;
      payload?: any;
    }
  | {
      type: null;
      payload?: any;
    };
export type GeneralAction = {
  meta?: {
    type?: Method;
    reducer?: Reducers;
  };
} & Action;

/*
 * reducer for resource data
 */

export function resourcesDataReducer(state: State = {}, { type, payload = {}, meta = {} }: GeneralAction) {
  const { data, errors, isLoading, filters, options } = payload || {};
  switch (type) {
    case SET_RESOURCE_DATA:
      return {
        ...state,
        ...pick(
          {
            errors,
            isLoading,
            filters,
            options,
            data: makeData(get(meta, 'reducer', 'replace'), state, data)
          },
          Object.keys(payload || {})
        )
      };
    case SET_ERRORS:
    case SET_FILTERS:
    case SET_LOADING:
      return { ...state, [dataKeys[type]]: payload };
    case SET_DATA:
      if (meta.type === 'OPTIONS') {
        return {
          ...state,
          options: payload
        };
      }
      return {
        ...state,
        data: makeData(get(meta, 'reducer', 'replace'), state, payload)
      };
    default:
      return state;
  }
}
