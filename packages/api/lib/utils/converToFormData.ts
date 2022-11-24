import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';

/*
 * function to convert body to FormData
 */
export function converToFormData(formData: FormData, value: any, recursiveKey = ''): FormData {
  if (isFunction(value)) {
    // eslint-disable-next-line no-console
    console.warn(`API detects invalid data value (function) in field: ${recursiveKey}`);
    return formData;
  }
  if (Array.isArray(value) || isPlainObject(value)) {
    return Object.entries(value).reduce(function (data, [key, value]) {
      const _key = recursiveKey ? `${recursiveKey}[${key}]` : key;
      return converToFormData(data, value, _key);
    }, formData);
  }
  formData.append(recursiveKey, value);
  return formData;
}
