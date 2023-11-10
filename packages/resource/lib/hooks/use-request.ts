import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequestAction } from '../resources/utils/make-actions';
import { getMetaFromResource } from '../resources/utils';
import { makeRequest } from '../resources/async-action';
import { makeResourceSelector } from './utils';
import get from 'lodash/get';
import { CustomRequestType, AsyncFuncType } from './types';
import { ResourcesType, ResourcesConfigType, Method, CancelablePromise } from '../types';

type RequestType = (data: any, meta: ResourcesType) => CancelablePromise;

export function useRequest(config: ResourcesConfigType, type: Method = 'GET'): RequestType {
  const dispatch = useDispatch();
  const meta = useMemo(
    () => ({
      ...getMetaFromResource(config),
      queries: typeof config === 'string' ? [] : config.queries
    }),
    [get(config, 'namespace', config)]
  );
  return useMemo(() => makeRequestAction(type, meta, dispatch) as RequestType, [dispatch, type, meta]);
}

export function useCustomRequest<DataType = {}, ErrorType = {}, FilterType = {}, OptionsType = {}>(
  asyncFunc: AsyncFuncType,
  config: ResourcesConfigType
) {
  const meta = useMemo(
    () => ({
      ...getMetaFromResource(config),
      queries: typeof config === 'string' ? [] : config.queries
    }),
    [get(config, 'namespace', config)]
  );
  const resource = useSelector(makeResourceSelector(config));
  const dispatch = useDispatch();
  const request = useCallback(
    function (payload:FilterType, actionmeta: any) {
      return dispatch(makeRequest(asyncFunc)(payload, { ...meta, ...actionmeta }))  ;
    },
    [dispatch, meta]
  );
  return useMemo<{
    isLoading: boolean;
    data: DataType | null;
    errors: ErrorType | null;
    filters: FilterType | null;
    options: OptionsType | null;
    request: CustomRequestType;
  }>(
    () => ({
      ...resource,
      request
    }),
    [resource, request]
  );
}
