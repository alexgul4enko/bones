import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { makeClearAction } from '../resources/utils';

/*
 * HOOK to remove resource from store
 */
export function useClear(namespace: string) {
  const dispatch = useDispatch();
  return useMemo(() => makeClearAction({ namespace }, dispatch), [namespace, dispatch]);
}
