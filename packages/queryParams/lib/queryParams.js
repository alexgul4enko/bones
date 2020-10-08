import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
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
        let [name, value] = decodeURIComponent(param.replace('+', '%20')).split('=') // TODO: why do we need replace('+', '%20')?
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


export function camelCaseParam(name) {
  const parts = name.split('__')
  name = camelCase(parts.shift())
  if(parts.length === 0) {
    return name
  }
  return `${name}[${parts.join('][')}]`
}

export function snakeCaseParam(name) {
  const parts = name.split('[')
  name = snakeCase(parts.shift())

  if(parts.length === 0) {
    return name
  }

  return `${name}__${parts.join('__').replace(/\]/g, '')}`
}

function orderingEnhancer(func) {
  return function(name) {
    return name.split(',').map(function(name) {
      let prefix = ''

      if(/^-\w/.test(name)) {
        prefix = '-'
        name = name.substr(1)
      }

      return prefix + func(name)
    }).join(',')
  }
}

camelCaseParam = orderingEnhancer(camelCaseParam) // eslint-disable-line no-func-assign
snakeCaseParam = orderingEnhancer(snakeCaseParam) // eslint-disable-line no-func-assign
