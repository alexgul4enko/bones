import { Reducers } from './resources/types';
import { CacheConfig } from '@cranium/cache';

type ParseFn = (value: any) => any;

export type Method = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';
export type CancelablePromise = Promise<any> & { cancel: () => void };

export declare class API {
  request(requestParams: any): CancelablePromise;
  get(endpoint: string, params?: any): CancelablePromise;
  post(endpoint: string, body?: any, params?: any): CancelablePromise;
  put(endpoint: string, body?: any, params?: any): CancelablePromise;
  patch(endpoint: string, body?: any, params?: any): CancelablePromise;
  options(endpoint: string, params?: any): CancelablePromise;
  delete(endpoint: string, params?: any): CancelablePromise;
}

export interface ResourcesType {
  namespace: string;
  endpoint?: string;
  forceUpdates?: boolean;
  queries?: string[];
  reducer?: Reducers;
  cache?: CacheConfig;
  type?: Method | string;
  baseURL?: string;
  transformValue?: ParseFn;
  transformErrors?: ParseFn;
}

export type ResourcesConfigType = string | ResourcesType;
