import { useMemo, useCallback } from 'react'
import { createSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import get from 'lodash/get'
import { makeResourceActions } from '../resources'
import { getNameSpace } from '../utils'


function makeResourceSelector(config) {
  const namespace = getNameSpace(get(config, 'namespace', config))
  return function(state) {
    return get(state, namespace, {})
  }
}


export default function useResource(config) {
  if(Array.isArray(config)) {
    throw new Error('useResource hook can accept only one resource config')
  }
  const dispatch = useDispatch()
  const resource = useSelector(makeResourceSelector(config))
  const actions = useMemo(() => makeResourceActions(config, dispatch), [config, dispatch])
  return useMemo(() => ({ ...resource, ...actions }), [resource, config])
}
