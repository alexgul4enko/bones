export type Method = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';

export type paramsSerializerFn = (params: Record<string, any>) => string;

export type BaseConfigsType = {
  baseURL?: string;
  headers?: HeadersInit;
  paramsSerializer?: paramsSerializerFn;
  isMultipartFormData?: (obj?: any) => boolean | boolean;
  prepareBody?: any;
  interceptors?: any;
};

export interface Params {
  baseURL?: string;
  endpoint: string;
  method: Method;
  headers?: HeadersInit;
  body?: any;
  params?: Record<string, any>;
  paramsSerializer?: paramsSerializerFn;
  mode?: Request['mode'];
  credentials?: Request['credentials'];
  cache?: Request['cache'];
  redirect?: Request['redirect'];
  referrer?: Request['referrer'];
  referrerPolicy?: Request['referrerPolicy'];
  integrity?: Request['integrity'];
  keepalive?: Request['keepalive'];
  signal?: Request['signal'];
  isMultipartFormData?: boolean;
}

export type ParamsType = Omit<Params, 'method' | 'endpoint'>;

export type CancelablePromise = Promise<any> & { cancel: () => void };
