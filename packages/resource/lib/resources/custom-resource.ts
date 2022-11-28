import { Reducers } from './types';
import { getNameSpace } from '../utils';
import get from 'lodash/get';
import { ResourceType } from './connect-resources';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, mergeProps } from './utils';
import { makeRequest } from './async-action';
import { Dispatch, Store } from 'redux';
import { ResourcesConfigType, CancelablePromise, API } from '../types';

interface ResourceParsed {
  namespace: string;
  endpoint: string;
  forceUpdates: boolean;
  queries?: string[];
  reducer: Reducers;
}

export interface CustomResourceHOC extends InferableComponentEnhancerWithProps<any, any> {
  namespace?: string;
  endpoint?: string;
  queries?: string[];
}

interface StoreType {
  dispatch: Dispatch;
  getState: Store['getState'];
}

/*
 * function to connect redux actions and store data to work whatever async action
 */

export function customResource<ResourceProps>(
  customFetch: (api: API, payload: any, meta: ResourcesConfigType, store: StoreType) => CancelablePromise
) {
  return function customResourceFetch(resource: ResourcesConfigType | string) {
    const resourceObject: ResourcesConfigType =
      typeof resource === 'string'
        ? {
            endpoint: resource,
            namespace: getNameSpace(resource),
            reducer: 'replace'
          }
        : resource;
    resourceObject.namespace = getNameSpace(resourceObject.namespace);
    if (!resourceObject.endpoint) {
      resourceObject.endpoint = resourceObject.namespace;
    }
    if (typeof resourceObject !== 'boolean') {
      resourceObject.forceUpdates = true;
    }
    if (!resourceObject.reducer) {
      resourceObject.reducer = 'replace';
    }

    const { namespace, endpoint, queries } = resourceObject;
    const customeResourceConnectHOC: CustomResourceHOC = connect(
      mapStateToProps(resource),
      (dispatch: Dispatch<any>) => ({
        [namespace]: {
          ...get(mapDispatchToProps(resourceObject, dispatch), namespace, {}),
          request(payload: any, actionmeta: Record<string, any> = {}) {
            return dispatch(
              makeRequest(customFetch)(payload, { ...(resourceObject as ResourceParsed), ...actionmeta })
            );
          }
        }
      }),
      mergeProps as (a: any, b: any, c: any) => ResourceProps
    );
    customeResourceConnectHOC.namespace = namespace;
    customeResourceConnectHOC.endpoint = endpoint;
    customeResourceConnectHOC.queries = queries;
    return customeResourceConnectHOC;
  };
}

type RequestPromise<T> = Promise<T> & { cancel: () => void };
export type CustomResourceType<DataType = {}, FiltersType = {}, ErrorType = {}, OptionsType = {}> = {
  request: (params?: any, meta?: Record<string, any>) => RequestPromise<any> | Promise<any>;
} & ResourceType<DataType, FiltersType, ErrorType, OptionsType>;
