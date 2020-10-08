import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'

function camelCaseTransform(name) {
  const parts = name.split('__')
  name = camelCase(parts.shift())
  if(parts.length === 0) {
    return name
  }
  return `${name}[${parts.join('][')}]`
}

function snakeCaseTransform(name) {
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

export const camelCaseParam = orderingEnhancer(camelCaseTransform)
export const snakeCaseParam = orderingEnhancer(snakeCaseTransform)
