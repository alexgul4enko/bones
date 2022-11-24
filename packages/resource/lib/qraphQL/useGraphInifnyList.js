import { useState, useCallback, useMemo, useEffect } from 'react';
import RequestStatus from '../hooks//utils/requestStatus';
import get from 'lodash/get';
import omit from 'lodash/omit';

export default function useGraphInifnyList({ request, filters, data, isLoading }) {
  const cancelRequest = useMemo(() => new RequestStatus(), []);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loadNext = useCallback(() => {
    if (!get(data, 'pageInfo.hasNextPage')) {
      return;
    }
    if (cancelRequest.isPending()) {
      console.warn('InfinitiList: can not load next page while processing previous request');
      return;
    }

    const apiRequest = request({ ...filters, cursor: get(data, 'pageInfo.endCursor') }, { reducer: 'graphList' });
    cancelRequest.setRequest(apiRequest);
    return apiRequest;
  }, [filters, request, data, cancelRequest]);
  const refresh = useCallback(() => {
    setIsRefreshing(true);
    cancelRequest.cancel();
    const apiRequest = request(omit(filters, 'cursor'), { reducer: 'replace' }).finally(() => setIsRefreshing(false));
    cancelRequest.setRequest(apiRequest);
    return apiRequest;
  }, [filters, request, setIsRefreshing, cancelRequest]);
  useEffect(() => cancelRequest.cancel, []);
  return { loadNext, refresh, isRefreshing };
}
