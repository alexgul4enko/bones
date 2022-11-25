import { parse } from 'path-to-regexp';
import get from 'lodash/get';

/*
 * functoin to get last conditional param from dynamic URL string
 * it returns false if URL does not contains conditional params
 */
export function parseIdKey(endpoint?: string): string {
  if (!endpoint) {
    return '';
  }
  if (!endpoint.includes(':')) {
    return '';
  }
  const conditionQuery = parse(endpoint)
    .filter((token) => typeof token !== 'string' && token.modifier === '?')
    .pop();
  return get(conditionQuery, 'name');
}
