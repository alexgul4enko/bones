import { compile } from 'path-to-regexp';
import { clearParams } from './clearParams';
import isEmpty from 'lodash/isEmpty';
import { paramsSerializerFn } from '../types';
import { paramsSerializer as queryString } from './paramsSerializer';
/*
 * Function to build URL string
 * @param {string}   baseURL            base URL in most cases it is /api/
 * @param {string}   endpoint           API endpoint could be dynamic URL
 * @param {object}   params             Object with params to compile dynamic URL and query string
 * @param {function} paramsSerializer   Function to convert Object to query string
 */

export function buildUrl(
  baseURL: string,
  endpoint: string,
  params?: Record<string, any>,
  paramsSerializer: paramsSerializerFn = queryString
) {
  if (typeof endpoint !== 'string') {
    throw new Error('enpoint param should be a string');
  }

  if (!isEmpty(params) && typeof params !== 'object') {
    throw new Error('params should be an object');
  }

  let _endpoint: string = endpoint;
  let _params: Record<string, any> | undefined = params;
  if (/\/:/.test(endpoint) && params && !isEmpty(params)) {
    _endpoint = compile(endpoint)(params);
    _params = clearParams(endpoint, params);
  }

  const queryParams = isEmpty(_params) || !_params ? '' : `?${paramsSerializer(_params)}`;
  return `${baseURL}${_endpoint}${queryParams}`.replace(/(https?:\/\/)|(\/)+/g, '$1$2');
}
