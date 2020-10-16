import { useMemo, useCallback, useEffect } from 'react'
import { createSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import get from 'lodash/get'
import { makeResourceActions } from '../resources'
import { getNameSpace } from '../utils'
import makeResourceSelector from './utils/makeResourceSelector'


function getActionByType(actions, type) {
  switch (type) {
    case 'POST':
      return actions.create
    case 'GET':
    default:
      return actions.fetch
  }
}

export default function usePrefetchResource(config, prefetchConfigs) {
  if(Array.isArray(config)) {
    throw new Error('useResource hook can accept only one resource config')
  }
  const dispatch = useDispatch()
  const resource = useSelector(makeResourceSelector(config, { isLoading: true }))
  const actions = useMemo(() => makeResourceActions(config, dispatch), [config, dispatch])
  useEffect(() => {
    const queries = get(prefetchConfigs, 'method') === 'POST' ? get(config, 'queries', [])
      : Array.from(new Set([...get(config, 'queries', []), ...Object.keys(get(prefetchConfigs, 'filters', []))]))
    const request = getActionByType(actions, get(prefetchConfigs, 'method'))(
      get(prefetchConfigs, 'filters'),
      { queries, type: get(prefetchConfigs, 'method', 'GET') }
    )
    if(get(prefetchConfigs, 'destroyOnUnmount', true)) {
      return () => {
        request.cancel()
        actions.clear()
      }
    }
    return request.cancel
  }, [])
  return useMemo(() => ({ ...resource, ...actions }), [resource, config])
}
