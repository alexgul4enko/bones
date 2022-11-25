import { useEffect, useState, useMemo } from 'react';
import { useClear } from './use-clear';
import { useCustomRequest } from './use-request';
import { getNameSpace } from '../utils';
import get from 'lodash/get';
import { ResourcesConfigType } from '../types';
import { AsyncFuncType } from './types';

interface Configs {
  destroyOnUnmount?: boolean;
  method?: string;
  filters?: Record<string, any>;
}

/*
 * HOOK to connect custom resource
 * send initial HTTP Request
 * automatically terminate request on unmount
 * clear resource data on unmount
 */
export function usePrefetchRequest<DataType = {}, ErrorType = {}, FilterType = {}, OptionsType = {}>(
  asyncFunc: AsyncFuncType,
  config: ResourcesConfigType,
  prefetchConfigs?: Configs
) {
  const [initialLoading, setLoading] = useState(true);
  const resource = useCustomRequest<DataType, ErrorType, FilterType, OptionsType>(asyncFunc, config);
  const namespace = useMemo(() => getNameSpace(typeof config === 'string' ? config : config?.namespace), [config]);
  const clear = useClear(namespace);
  useEffect(() => {
    const request = resource.request(get(prefetchConfigs, 'filters'), {
      type: get(prefetchConfigs, 'method', 'GET'),
      namespace
    });
    request.finally(() => {
      setLoading(false);
    });
    if (get(prefetchConfigs, 'destroyOnUnmount', true)) {
      return () => {
        if (typeof get(request, 'cancel') === 'function') {
          (request as any).cancel();
        }
        clear();
      };
    }
    return get(request, 'cancel');
  }, []);
  return { ...resource, initialLoading };
}
