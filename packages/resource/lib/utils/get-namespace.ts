import camelCase from 'lodash/camelCase';
import isString from 'lodash/isString';
import { parse } from 'path-to-regexp';

/*
 * functoin to prepare  namespace for redux
 * it should convert dynamic URL to namespace
 */
export function getNameSpace(namespace?: string): string {
  if (typeof namespace !== 'string') {
    return '';
  }
  return camelCase(parse(namespace).filter(isString).join());
}
