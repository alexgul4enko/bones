import { useState, useCallback, useMemo, useEffect } from 'react';
import { RequestStatus } from '../hooks//utils/request-status';
import { CancelablePromise } from '../types';
import get from 'lodash/get';
import omit from 'lodash/omit';
import mergeWith from 'lodash/mergeWith';
import merge from 'lodash/merge';

export type useGraphInifnyListParams = {
  request: (...args: any[]) => CancelablePromise;
  filters?: any;
  data?: any;
  isLoading?: boolean;
};

export type useGraphInifnyListOptions = {
  hasNext?: (data: any) => boolean;
  cursorKey?: string;
  getNextFilters?: (data: any) => Record<string, string>;
  concatFn?: (prev: any, next: any) => any;
};

function defaultReducer(prev: any, next: any) {
  return mergeWith(merge({}, prev), merge({}, next), (destination, source) => {
    if (Array.isArray(source) || Array.isArray(destination)) {
      return [...(destination || []), ...(source || [])];
    }
    if (destination && source === undefined) {
      return null;
    }
  });
}

export function useGraphInifnyList(
  { request, filters, data, isLoading },
  options: useGraphInifnyListOptions | undefined = {}
) {
  const cancelRequest = useMemo(() => new RequestStatus(), []);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loadNext = useCallback(() => {
    if (typeof options?.hasNext === 'function' ? !options?.hasNext(data) : !get(data, 'pageInfo.hasNextPage')) {
      return;
    }
    if (cancelRequest.isPending()) {
      console.warn('InfinitiList: can not load next page while processing previous request');
      return;
    }

    const apiRequest = request(
      {
        ...filters,
        ...{
          [options.cursorKey || 'cursor']:
            typeof options.getNextFilters === 'function'
              ? options.getNextFilters(data)
              : get(data, 'pageInfo.endCursor')
        }
      },
      { reducer: options.concatFn || defaultReducer }
    );
    cancelRequest.setRequest(apiRequest);
    return apiRequest;
  }, [filters, request, data, cancelRequest]);
  const refresh = useCallback(() => {
    setIsRefreshing(true);
    cancelRequest.cancel();
    const apiRequest = request(omit(filters, options.cursorKey || 'cursor'), { reducer: 'replace' }).finally(() =>
      setIsRefreshing(false)
    );
    cancelRequest.setRequest(apiRequest);
    return apiRequest;
  }, [filters, request, setIsRefreshing, cancelRequest]);
  useEffect(() => cancelRequest.cancel, []);
  return { loadNext, refresh, isRefreshing };
}
