import { useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeRequestAction, getMetaFromResource, makeRequest } from '../resources'
import makeResourceSelector from './utils/makeResourceSelector'

export function useRequest(config, type = 'GET') {
  if(Array.isArray(config)) {
    throw new Error('config can not be an array')
  }
  const meta = useMemo(() => ({ ...getMetaFromResource(config), queries: config.queries }), [])
  return makeRequestAction(type, meta, useDispatch())
}


export function useCustomRequest(asyncFunc, config) {
  if(Array.isArray(config)) {
    throw new Error('config can not be an array')
  }
  if(typeof asyncFunc !== 'function') {
    throw new Error('please define async function')
  }
  const meta = useMemo(() => ({ ...getMetaFromResource(config), queries: config.queries }), [])
  const resource = useSelector(makeResourceSelector(config))
  const dispatch = useDispatch()
  const request = useCallback(function(payload, actionmeta) {
    return dispatch(makeRequest(asyncFunc)(payload, { ...meta, ...actionmeta }))
  }, [dispatch, meta])
  return useMemo(() => ({
    ...resource,
    request,
  }), [resource, request])
}
