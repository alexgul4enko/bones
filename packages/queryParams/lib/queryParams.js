import { camelCaseParam, snakeCaseParam } from './utils'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'


export default class QS {
  constructor(camelCaseValues = []) {
    this.camelCaseValues = camelCaseValues
    this.buildQueryParams = this.buildQueryParams.bind(this)
    this.parseQueryParams = this.parseQueryParams.bind(this)
  }

  isCamelCaseTrasformNeeded(name) {
    return Array.isArray(this.camelCaseValues) &&
      !isEmpty(this.camelCaseValues) &&
      this.camelCaseValues.includes(name)
  }

  parseQueryParams(str) {
    if(typeof str !== 'string') {
      return {}
    }
    return str
      .split('?')
      .slice(1)
      .join('?')
      .split('&')
      .reduce((params, param) => {
        let [name, value] = decodeURIComponent(param).split('=')
        name = camelCaseParam(name)
        if(this.isCamelCaseTrasformNeeded(name)) {
          value = camelCaseParam(value)
        }
        if(has(params, name)) {
          return {
            ...params,
            [name]: [].concat(params[name], value),
          }
        }
        return {
          ...params,
          [name]: value,
        }
      }, {})
  }

  buildQueryParams(params) {
    if(isEmpty(params)) {
      return ''
    }
    return Object.entries(params).reduce((res, [key, value]) => {
      if(value === null || value === undefined || value === '') {
        return res
      }
      if(!Array.isArray(value)) {
        value = [value]
      }
      const _key = snakeCaseParam(key)
      const values = value
        .filter(val => String(val).length > 0)
        .map((val) => {
          if(this.isCamelCaseTrasformNeeded(key)) {
            val = snakeCaseParam(val)
          }
          return `${encodeURIComponent(_key)}=${encodeURIComponent(val)}`
        })
      return [...res, ...values]
    }, []).join('&')
  }
}
