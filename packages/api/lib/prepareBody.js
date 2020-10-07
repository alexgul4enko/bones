import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'

export default function prepareBody(body, isMultipartFormData) {
  if(isMultipartFormData) {
    return converToFormData(new FormData(), body)
  }
  return JSON.stringify(body)
}

function converToFormData(formData, value, recursiveKey = '') {
  if(isFunction(value)) {
    console.warn(`API detects invalid data value (function) in field: ${recursiveKey}`)
    return formData
  }
  if(Array.isArray(value) || isPlainObject(value)) {
    return Object.entries(value).reduce(function(data, [key, value]) {
      const _key = recursiveKey ? `${recursiveKey}[${key}]` : key
      if(['avatar', 'logo', 'file'].includes(key) && isString(value)) {
        console.warn(`API detects invalid data value (String) in field: ${_key}`)
        return formData
      }
      return converToFormData(data, value, _key)
    }, formData)
  }
  formData.append(recursiveKey, value)
  return formData
}
