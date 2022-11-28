import { Dispatch, Store } from 'redux';
import { ResourcesType, CancelablePromise, API } from '../types';

export interface StoreType {
  dispatch: Dispatch;
  getState: Store['getState'];
}
export type CustomRequestType = (data: any, meta?: ResourcesType) => CancelablePromise | Promise<any>;
export type AsyncFuncType = (api: API, payload: any, meta: ResourcesType, store: StoreType) => CancelablePromise;
