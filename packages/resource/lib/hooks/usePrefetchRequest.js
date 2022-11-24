import { useEffect, useState } from 'react';
import useClear from './useClear';
import { useCustomRequest } from './useRequest';
import { getNameSpace } from '../utils';
import get from 'lodash/get';

export default function usePrefetchRequest(asyncFunc, config, prefetchConfigs) {
  const [initialLoading, setLoading] = useState(true);
  const resource = useCustomRequest(asyncFunc, config);
  const clear = useClear(getNameSpace(get(config, 'namespace', config)));
  useEffect(() => {
    const request = resource.request(get(prefetchConfigs, 'filters'), {
      type: get(prefetchConfigs, 'method', 'GET')
    });
    request.finally(() => {
      setLoading(false);
    });
    if (get(prefetchConfigs, 'destroyOnUnmount', true)) {
      return () => {
        request.cancel();
        clear();
      };
    }
    return request.cancel;
  }, []);
  return { ...resource, initialLoading };
}
