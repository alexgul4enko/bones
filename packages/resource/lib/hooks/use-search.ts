import { useMemo, useEffect } from 'react';
import { RequestStatus } from './utils';
import { promiseDebounce } from '../utils';
import { CustomRequestType } from './types';
import { ResourcesType } from '../types';

/*
 * HOOK that implements onair search
 */
export function useSearch(request: CustomRequestType, timeout?: number) {
  const cancelRequest = useMemo(() => new (RequestStatus as any)(), []);
  const debouncedRequest = useMemo(
    () =>
      promiseDebounce(
        (...args: [data: any, meta?: ResourcesType]) => {
          cancelRequest.cancel();
          const _request = request(...args);
          cancelRequest.setRequest(_request);
          return _request;
        },
        typeof timeout === 'number' ? timeout : 200
      ),
    []
  );
  useEffect(() => cancelRequest.cancel, []);

  return debouncedRequest;
}
