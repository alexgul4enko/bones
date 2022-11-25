import { Method } from '../types';
import { CacheConfig } from '@cranium/cache';

import { Reducers } from './types';
export const REQUEST = '@resource/request';
export const SET_DATA = '@resource/set-data';
export const SET_ERRORS = '@resource/set-errors';
export const SET_LOADING = '@resource/set-loading';
export const SET_FILTERS = '@resource/set-filters';
export const SET_RESOURCE_DATA = '@resource/set-resourceData';
export const CLEAR_RESOURCE = '@resource/clear';

export interface OptionsMeta {
  namespace: string;
}

export interface DataMeta extends OptionsMeta {
  endpoind?: string;
  reducer: Reducers;
  forceUpdates?: boolean;
  queries?: string[];
  type?: Method;
  cache?: CacheConfig;
}

export interface ResourceActionPayload {
  data?: any;
  errors?: any;
  isLoading?: boolean;
  filters?: Record<string, any>;
  options?: any;
}

export function clear(meta: OptionsMeta) {
  return {
    type: CLEAR_RESOURCE,
    meta
  };
}

export function setData(payload: any, meta: DataMeta) {
  return {
    type: SET_DATA,
    meta,
    payload
  };
}

export function setResourceData(payload: ResourceActionPayload, meta: DataMeta) {
  return {
    type: SET_RESOURCE_DATA,
    meta,
    payload
  };
}

export function setFilters(payload: Record<string, any>, meta: OptionsMeta) {
  return {
    type: SET_FILTERS,
    meta,
    payload
  };
}

export function setErrors(payload: any, meta: OptionsMeta) {
  return {
    type: SET_ERRORS,
    meta,
    payload
  };
}

export function setLoading(payload: boolean, meta: OptionsMeta) {
  return {
    type: SET_LOADING,
    meta,
    payload
  };
}
