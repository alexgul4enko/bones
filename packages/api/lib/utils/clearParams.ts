import { parse } from 'path-to-regexp';
import omit from 'lodash/omit';

/*
 * function to remove dynamic URL params from params
 * This will be used to pass URL params to compile dynamic URL
 * and rest params will be passed to search query
 */
export function clearParams(endpoint: string, params: Record<string, any>): Record<string, any> {
  if (!endpoint) {
    return params;
  }
  const keys = parse(endpoint);
  const keysToOmit = keys.map((token) => (typeof token === 'string' ? '' : token.name)).filter(Boolean);
  return omit(params, keysToOmit);
}
