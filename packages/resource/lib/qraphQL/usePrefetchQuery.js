import usePrefetchRequest from '../hooks/usePrefetchRequest';
import getConfigs from './getConfigs';
import request from './request';
import { useState } from 'react';

export default function usePrefetchQuery(query, configs) {
  return function (filters = {}) {
    const [initialLoading] = useState(true);
    const requestConfig = getConfigs(query, configs);
    const resourceData = usePrefetchRequest(request, requestConfig, {
      filters,
      destroyOnUnmount: configs.destroyOnUnmount
    });

    return {
      isLoading: true,
      initialLoading,
      ...resourceData
    };
  };
}
