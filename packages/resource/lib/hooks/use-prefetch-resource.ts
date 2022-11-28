import { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { getQueries } from '../resources/utils';
import { makeResourceSelector, useGetActions } from './utils';
import { ResourcesConfigType } from '../types';
import { ResourceType } from '../resources/connect-resources';

function getActionByType(actions: { create: any; fetch: any }, type?: 'GET' | 'POST') {
  switch (type) {
    case 'POST':
      return actions.create;
    default:
      return actions.fetch;
  }
}

interface Configs {
  method?: 'GET' | 'POST';
  destroyOnUnmount?: boolean;
  filters?: Record<string, any>;
}

/*
 * HOOK to connect REST API resource
 * send initial HTTP Request
 * automatically terminate request on unmount
 * clear resource data on unmount
 */
export function usePrefetchResource<DataType = {}, ErrorType = {}, FilterType = {}, OptionsType = {}>(
  config: ResourcesConfigType,
  prefetchConfigs?: Configs
) {
  const [initialLoading, setInitialLoading] = useState(true);
  const resource = useSelector(makeResourceSelector(config, { isLoading: true }));
  const actions = useGetActions(config);
  useEffect(() => {
    const endpoint = typeof config === 'string' ? config : config.endpoint || config.namespace;
    const queries = getQueries(
      endpoint,
      get(prefetchConfigs, 'method'),
      get(config, 'queries', []),
      get(prefetchConfigs, 'filters', {})
    );
    const request = getActionByType(actions, get(prefetchConfigs, 'method'))(get(prefetchConfigs, 'filters'), {
      queries,
      type: get(prefetchConfigs, 'method', 'GET')
    });
    request.finally(() => {
      setInitialLoading(false);
    });
    if (get(prefetchConfigs, 'destroyOnUnmount', true)) {
      return () => {
        request.cancel();
        actions.clear();
      };
    }

    return request.cancel;
  }, []);
  return useMemo<ResourceType<DataType, FilterType, ErrorType, OptionsType> & { initialLoading: boolean }>(
    () => ({ initialLoading, isLoading: true, ...resource, ...actions }),
    [resource, config]
  );
}
