import get from 'lodash/get';
import omit from 'lodash/omit';
import { buildUrl } from './utils/buildUrl';
import { Interceptor } from './Interceptor';
import { paramsSerializer as serializer } from './utils/paramsSerializer';
import { hasFile } from './utils/hasFile';
import { mergeConfigs } from './utils/mergeConfigs';
import { Params, CancelablePromise, ParamsType, BaseConfigsType } from './types';
import { makeParams, makeBodyParams, handleResponseCallback, finalResponseIterceptor } from './utils/apiHelpers';
import defaultConfigs from './defaults';

type ResponceInterceptor = (data: { response: Response }) => Response | any;
type RequestInterceptor = (data: Params) => Params;
interface AbortError {
  code: number;
  message: string;
  name: string;
}

/*
 * global module to send HTTP request using fetch API
 * Spec:
 *  - automatically convert body to string
 *  - automatically convert body to FormData in case request has instance of File
 *  - transform JSON query params to string
 *  - ability to add interceptor before sending request
 *  - ability to add interceptor on fetch resolve
 *  - returns promise with extra method "cancel" to terminate HTTP request
 *  - automatically returs JSON request body
 * Methods:
 * -   request   to send any type of HTTP request
 * -   get       to send GET request (body in undefined even if pass body as an arg)
 * -   post      to send POST request
 * -   patch     to send PATCH request
 * -   options   to send OPTIONS request
 * -   delete    to send DELETE request
 * -   put       to send PUT request
 */

export class API {
  configs: BaseConfigsType;

  interceptors: {
    response: Interceptor<ResponceInterceptor>;
    request: Interceptor<RequestInterceptor>;
  };

  constructor(configs?: Omit<Partial<BaseConfigsType>, 'interceptors'>) {
    const options = mergeConfigs(omit(configs, 'interceptors'), defaultConfigs);

    this.configs = omit(options, 'interceptors');
    this.interceptors = options.interceptors;
  }

  request(requestParams: Params): CancelablePromise {
    const {
      baseURL = this.configs.baseURL,
      endpoint = '',
      params,
      method = 'GET',
      headers = {},
      paramsSerializer = this.configs.paramsSerializer,
      isMultipartFormData = this.configs.isMultipartFormData,
      body,
      ...restOptions
    } = requestParams;
    const url = buildUrl(baseURL, endpoint, params, paramsSerializer);
    const _headers: Headers = new Headers(Object.assign({}, this.configs.headers, headers));
    // Check if should convert body to FormData
    const _isMultipartFormData: boolean =
      typeof isMultipartFormData === 'function'
        ? this.configs.isMultipartFormData(body || {})
        : isMultipartFormData === true;
    // Delete Content-Type application/json for multipartFormData requests
    if (_isMultipartFormData) {
      _headers.delete('Content-Type');
    }

    /* Create Request body
     * If method GET there should not be body
     * Othevise Convert body to String or FormData based on _isMultipartFormData flag
     */
    const _body: string | FormData | undefined = this.configs.prepareBody(
      body || {},
      _isMultipartFormData,
      method,
      _headers.get('Content-Type')
    );

    const options = {
      ...restOptions,
      method,
      headers: _headers,
      body: _body
    };
    // create controller to terminate request
    const controller = new AbortController();
    // run request Success inteceptors
    const wrappedPromise = this.interceptors.request
      .run({ ...options, url })
      // set Request using fetch
      .then(({ url, ...opts }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const request = new Request(url, { ...opts, signal: get(opts, 'signal') || controller.signal });
        return fetch(request);
      })
      // get JSON respoce data
      .then((response) => {
        return handleResponseCallback(response);
      })
      // Check if responce has failed
      .then((data) => {
        if (get(data, 'response.ok')) {
          return data;
        }
        return Promise.reject(data);
      })
      // run responce Success inteceptors
      .then((data) => {
        return this.interceptors.response.run(data);
      })
      // run responce Error inteceptors
      .catch((err) => {
        // skip aborted requests
        if (get(err, 'code') === 20) {
          const errorr: AbortError = err as AbortError;
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            errors: {
              code: errorr.code,
              message: errorr.message,
              name: errorr.name
            }
          });
        }
        return this.interceptors.response.err(get(err, 'data') || err).then((err) => {
          throw err;
        });
      });
    (wrappedPromise as CancelablePromise).cancel = function () {
      controller.abort();
    };
    return wrappedPromise as CancelablePromise;
  }

  get(endpoint: string, params?: ParamsType) {
    return this.request(makeParams(endpoint, 'GET', params));
  }

  post(endpoint: string, body?: any, params?: ParamsType) {
    return this.request(makeBodyParams(endpoint, 'POST', body, params));
  }

  put(endpoint: string, body?: any, params?: ParamsType) {
    return this.request(makeBodyParams(endpoint, 'PUT', body, params));
  }

  patch(endpoint: string, body?: any, params?: ParamsType) {
    return this.request(makeBodyParams(endpoint, 'PATCH', body, params));
  }

  options(endpoint: string, params?: ParamsType) {
    return this.request(makeParams(endpoint, 'OPTIONS', params));
  }

  delete(endpoint: string, params?: ParamsType) {
    return this.request(makeParams(endpoint, 'DELETE', params));
  }
}
