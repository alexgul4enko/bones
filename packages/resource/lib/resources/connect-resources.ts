import { FC, PropsWithChildren } from 'react';
import { Reducers } from './types';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, mergeProps } from './utils';
import { ResourcesConfigType, ResourcesType } from '../types';

/*
 * function to connect redux actions and store data to work with REST API
 */

export function connectResources<PropTypes>(resource: ResourcesConfigType | ResourcesConfigType[]) {
  return connect(
    mapStateToProps(resource),
    (dispatch) => mapDispatchToProps(resource, dispatch),
    mergeProps
  ) as any as (comp: FC<any>) => FC<PropsWithChildren<PropTypes>>;
}

type CancelablePromise<T> = Promise<T> & { cancel: () => void };
type FetchParams = Record<string, any>;

export interface FetchMeta extends Partial<ResourcesType> {
  signal?: AbortSignal;
  [key: string]: any;
}

export interface PostMeta extends FetchMeta {
  filters?: Record<string, unknown>;
}

export interface SimpleMeta {
  namespace: string;
}

export interface SetDataMeta {
  namespace?: string;
  reducer?: Reducers;
}

export interface ResourceType<DataType = {}, FiltersType = {}, ErrorType = {}, OptionsType = {}> {
  isLoading: boolean;
  data: DataType | null;
  errors: ErrorType | null;
  filters: FiltersType | null;
  options: OptionsType | null;
  fetch: (params?: FetchParams, meta?: FetchMeta) => CancelablePromise<any>;
  fetchOptions: (params?: FetchParams, meta?: FetchMeta) => CancelablePromise<any>;
  create: (params?: any, meta?: PostMeta) => CancelablePromise<any>;
  replace: (params?: any, meta?: PostMeta) => CancelablePromise<any>;
  update: (params?: any, meta?: PostMeta) => CancelablePromise<any>;
  remove: (params?: any, meta?: FetchMeta) => CancelablePromise<any>;
  setLoading: (isLoading: boolean, meta?: SimpleMeta) => void;
  setData: (data: any, meta?: SetDataMeta) => void;
  setErrors: (errors: any, meta?: SimpleMeta) => void;
  setFilters: (filters: Record<string, any> | null | undefined, meta?: SimpleMeta) => void;
  clear: (meta?: SimpleMeta) => void;
}
