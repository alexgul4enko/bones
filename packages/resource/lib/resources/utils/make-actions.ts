import { defaultFetch } from '../async-action';
import { getMetaFromResource } from './get-meta-from-resource';
import { clear, setData, setErrors, setLoading, setFilters } from '../actions';
import { Dispatch } from 'redux';
import { Reducers } from '../types';
import { Method } from '../../types';

interface Meta {
  endpoint: string;
  namespace: string;
  reducer: Reducers;
  queries?: string[];
  forceUpdates?: boolean;
  filters?: Record<string, unknown>;
}

interface Resource {
  endpoint?: string;
  namespace: string;
  reducer?: Reducers;
  queries?: string[];
}

export function makeRequestAction(type: Method, meta: Meta, dispatch: Dispatch<any>): any {
  return function (payload: any, actionmeta: Record<string, any> = {}) {
    return dispatch(defaultFetch(payload, { ...meta, ...actionmeta, type }));
  };
}

export function makeSimpleAction(meta: { namespace: string }, action: any, dispatch: Dispatch<any>) {
  return (payload: any, actionmeta?: { namespace: string }) =>
    dispatch(action(payload, { ...meta, ...(actionmeta || {}) }));
}

export function makeClearAction(meta: { namespace: string }, dispatch: Dispatch<any>) {
  return (actionmeta: { namespace?: string } = {}) => dispatch(clear({ ...meta, ...actionmeta }));
}

export function makeResourceActions(resource: string | Resource, dispatch: Dispatch<any>): any {
  const meta = getMetaFromResource(resource);
  return {
    create: makeRequestAction('POST', meta, dispatch),
    fetch: makeRequestAction(
      'GET',
      { ...meta, queries: typeof resource !== 'string' ? resource.queries : undefined },
      dispatch
    ),
    update: makeRequestAction('PATCH', meta, dispatch),
    remove: makeRequestAction('DELETE', meta, dispatch),
    replace: makeRequestAction('PUT', meta, dispatch),
    fetchOptions: makeRequestAction('OPTIONS', meta, dispatch),
    setData: makeSimpleAction(meta, setData, dispatch),
    setErrors: makeSimpleAction(meta, setErrors, dispatch),
    setLoading: makeSimpleAction(meta, setLoading, dispatch),
    clear: makeClearAction(meta, dispatch),
    setFilters: makeSimpleAction(meta, setFilters, dispatch)
  };
}
