import isPlainObject from 'lodash/isPlainObject';
import flatMapDeep from 'lodash/flatMapDeep';

/*
 * function to detect if object has File instance value (including nested)
 */

export function hasFile(obj: any): boolean {
  if (obj instanceof FormData) {
    return true;
  }
  return deepValues(obj).some((v) => v instanceof File);
}

/*
 * creates flat list of all `obj` values (including nested)
 */

export function deepValues(obj: any): any[] {
  if (isPlainObject(obj) || Array.isArray(obj)) {
    return flatMapDeep(obj, deepValues);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [obj];
}
