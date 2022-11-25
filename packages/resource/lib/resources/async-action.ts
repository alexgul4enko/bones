import { compile } from 'path-to-regexp';
import { AnyAction, Dispatch, Store } from 'redux';
import { CacheModule } from '@cranium/cache';
import { setResourceData } from './actions';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { Reducers } from './types';
import { defaultHTTPRequest } from './utils/default-HTTPRequest';
import { makeCacheConfig } from './utils/cache-config';
import { getQueries } from './utils/get-queries';
import { ResourcesType, API, Method, CancelablePromise } from '../types';

export interface GenericMeta extends Omit<ResourcesType, 'type'> {
  endpoint: string;
  reducer: Reducers;
  [key: string]: any;
}

export interface Meta extends GenericMeta {
  type: Method;
}

type HTTPRequest<T> = (
  api: API,
  payload: any,
  meta: T,
  store: { dispatch: Dispatch; getState: Store['getState'] }
) => CancelablePromise;

export function makeRequest<V extends GenericMeta>(httpRequest: HTTPRequest<V>) {
  return function request(payload: any, meta: V) {
    return ((dispatch: Dispatch, getState: Store['getState'], api: API) => {
      let { endpoint, queries = [], forceUpdates, filters } = meta;
      let _filters = filters ? { ...filters } : undefined;
      if (endpoint && endpoint.search(/\/:/) > -1 && _filters) {
        _filters = pick(_filters, getQueries(endpoint, 'POST', Object.keys(_filters)));
      }
      if (endpoint && endpoint.search(/\/:/) > -1) {
        endpoint = compile(endpoint)(filters || payload);
      }
      const cacheConfig = makeCacheConfig(meta.namespace, meta.cache);
      const cachedData = cacheConfig ? CacheModule.get(cacheConfig, meta.namespace, meta, payload) : null;
      if (!forceUpdates) {
        dispatch(
          setResourceData(
            {
              isLoading: true,
              errors: null,
              ...(cachedData ? { data: cachedData } : {})
            },
            meta
          )
        );
      } else if (cachedData) {
        dispatch(setResourceData({ data: cachedData }, meta));
      }
      if (!isEmpty(queries)) {
        dispatch(
          setResourceData(
            {
              filters: pick(payload, queries)
            },
            meta
          )
        );
      }
      if (cacheConfig && cacheConfig.refresh === false) {
        return Promise.resolve(cachedData);
      }
      const promise = httpRequest(api, payload, { ...meta, endpoint, filters: _filters }, { dispatch, getState });
      promise
        .then((response: any) => {
          if (meta.transformValue && typeof meta.transformValue === 'function') {
            return meta.transformValue(response);
          }
          return response;
        })
        .then((response: any) => {
          if (cacheConfig) {
            CacheModule.put(cacheConfig, response, meta.namespace, meta, payload);
          }
          dispatch(
            setResourceData(
              {
                [meta.type === 'OPTIONS' ? 'options' : 'data']: response,
                isLoading: false,
                errors: null
              },
              meta
            )
          );
          return response;
        })
        .catch((err: any) => {
          if (cacheConfig) {
            CacheModule.put(cacheConfig, null, meta.namespace, meta, payload);
          }
          const errors =
            meta.transformErrors && typeof meta.transformErrors === 'function'
              ? meta.transformErrors(err)
              : get(err, 'errors', err);
          if (!forceUpdates && get(err, 'errors.code') !== 20) {
            dispatch(setResourceData({ isLoading: false, errors, data: null }, meta));
          }
          throw errors;
        });
      return promise;
    }) as any as AnyAction;
  };
}

export const defaultFetch = makeRequest<Meta>(defaultHTTPRequest);
