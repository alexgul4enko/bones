import { API, Method, CancelablePromise } from '../../types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

interface Meta {
  type: Method;
  endpoint: string;
  queries?: string[];
  signal?: AbortSignal;
  baseURL?: string;
  filters?: Record<string, unknown>;
}

export function defaultHTTPRequest(api: API, payload: any, meta: Meta): CancelablePromise {
  return api.request({
    method: meta.type,
    endpoint: meta.endpoint,
    body: typeof payload === 'object' ? omit(payload, meta.queries || []) : payload,
    params: meta.filters || (typeof payload === 'object' ? pick(payload, meta.queries || []) : {}),
    signal: meta.signal,
    baseURL: meta.baseURL
  });
}
