import has from 'lodash/has';
import noop from 'lodash/noop';
import { Params, Method, ParamsType } from '../types';

export function checkUrl(url: string) {
  if (!url) {
    throw new Error('endpoint is required but got: empty string');
  }
}

export function makeParams(url: string, method: Method, params?: ParamsType): Params {
  checkUrl(url);
  return { ...(params || {}), endpoint: url, method };
}

export function makeBodyParams(url: string, method: Method, body?: any, params?: ParamsType): Params {
  checkUrl(url);
  return {
    ...(params || {}),
    endpoint: url,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    body,
    method
  };
}

interface ResponseCallback {
  response: Response;
  data?: any;
}

export function handleResponseCallback(response: Response): Promise<ResponseCallback> {
  if (response?.headers?.get && (response.headers.get('Content-Type') || '').includes('application/json')) {
    return response.json().then((data: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { data, response };
    });
  }
  return Promise.resolve({ response });
}

interface Resp {
  data?: any;
}

export function finalResponseIterceptor(response: Resp): Record<string, any> | any {
  return has(response, 'data') ? response.data : response;
}
