import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setData, setFilters, setErrors, setLoading } from '../resources';
import { makeSimpleAction } from '../resources/utils';

/*
 * HOOK to change resource data
 */
export function useSetData(namespace: string) {
  const dispatch = useDispatch();
  return useMemo(() => makeSimpleAction({ namespace }, setData, dispatch), [namespace, dispatch]);
}

/*
 * HOOK to change resource filters
 */
export function useSetFilters(namespace: string) {
  const dispatch = useDispatch();
  return useMemo(() => makeSimpleAction({ namespace }, setFilters, dispatch), [namespace, dispatch]);
}

/*
 * HOOK to change resource errors
 */
export function useSetErrors(namespace: string) {
  const dispatch = useDispatch();
  return useMemo(() => makeSimpleAction({ namespace }, setErrors, dispatch), [namespace, dispatch]);
}

/*
 * HOOK to change resource loading flag
 */
export function useSetLoading(namespace: string) {
  const dispatch = useDispatch();
  return useMemo(() => makeSimpleAction({ namespace }, setLoading, dispatch), [namespace, dispatch]);
}
