import { Dispatch, Store } from 'redux';
import { ResourcesType, CancelablePromise, API } from '../types';

export interface StoreType {
  dispatch: Dispatch;
  getState: Store['getState'];
}
export type CustomRequestType<DataType = any, Filters= any, MetaType=ResourcesType> = (data?: Filters, meta?: MetaType) => CancelablePromise<DataType>;
export type AsyncFuncType = (api: API, payload: any, meta: ResourcesType, store: StoreType) => CancelablePromise;
