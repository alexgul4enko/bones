import get from 'lodash/get';
import { getListKey } from './utils/get-list-key';
/*
 * Reducer to join objects
 */
export function object(prev?: Record<string, any>, next?: Record<string, any>): Record<string, any> {
  return {
    ...(prev || {}),
    ...(next || {})
  };
}

/*
 * Reducer to do not make any changes in redux
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function none<T>(prev: T, next: any): T {
  return prev;
}

/*
 * Reducer to skip previous store and change it
 */
export function replace<T>(prev: any, next: T): T {
  return next;
}

/*
 * Reducer for infinity lists
 */

interface ListData {
  count?: number;
  results: any[];
  [key: string]: unknown;
}

export function infinityList(prev?: ListData, next?: ListData) {
  const listKey: string | null = getListKey(prev) || getListKey(next);
  if (!listKey) {
    return { ...prev, ...next };
  }
  return {
    ...prev,
    ...next,
    [listKey]: [...(get(prev, listKey, []) as unknown[]), ...(get(next, listKey, []) as unknown[])]
  };
}
