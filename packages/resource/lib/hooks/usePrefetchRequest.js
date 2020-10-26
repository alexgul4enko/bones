import { useEffect } from 'react'
import useClear from './useClear'
import { useCustomRequest } from './useRequest'
import { getNameSpace } from '../utils'
import get from 'lodash/get'

export default function usePrefetchRequest(asyncFunc, config, prefetchConfigs) {
  const resource = useCustomRequest(asyncFunc, config)
  const clear = useClear(getNameSpace(get(config, 'namespace', config)))
  useEffect(() => {
    const request = resource.request(
      get(prefetchConfigs, 'filters'),
      { type: get(prefetchConfigs, 'method', 'GET') }
    )
    if(get(prefetchConfigs, 'destroyOnUnmount', true)) {
      return () => {
        request.cancel()
        clear()
      }
    }
    return request.cancel
  }, [])
  return resource
}
