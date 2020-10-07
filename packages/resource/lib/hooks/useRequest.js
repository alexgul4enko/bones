import { useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeRequestAction, getMetaFromResource, makeRequest } from '../resources'


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
  const dispatch = useDispatch()
  return useCallback(function(payload, actionmeta) {
    return dispatch(makeRequest(asyncFunc)(payload, { ...meta, ...actionmeta }))
  }, [dispatch, meta])
}
