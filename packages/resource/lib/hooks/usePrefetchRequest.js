import { useEffect } from 'react'
import { useCustomRequest } from './useRequest'
import get from 'lodash/get'

export default function usePrefetchRequest(asyncFunc, config, prefetchConfigs) {
  const resource = useCustomRequest(asyncFunc, config)
  useEffect(() => {
    const request = resource.request(
      get(prefetchConfigs, 'filters'),
      { type: get(prefetchConfigs, 'method', 'GET') }
    )
    if(get(prefetchConfigs, 'destroyOnUnmount', true)) {
      return () => {
        request.cancel()
        actions.clear()
      }
    }
    return request.cancel
  }, [])
  return resource
}
