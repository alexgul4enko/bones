import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '@cranium/redux-helpers';

/*
 * HOOK to remove resource from store
 */
export function useClearAll() {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(reset()), [dispatch]);
}
