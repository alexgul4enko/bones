import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'

export default class Interceptor {
  constructor(finalIterceptor) {
    if(finalIterceptor) {
      this.finalIterceptor = finalIterceptor
    }
    this.onSuccess = []
    this.onError = []
  }

  finalIterceptor(response) {
    return has(response, 'data') ? response.data : response
  }

  use({ onSuccess, onError }) {
    if(!!onSuccess && typeof onSuccess !== 'function') {
      throw new Error('success interceptor shoud be a functoin')
    }
    if(!!onError && typeof onError !== 'function') {
      throw new Error('error interceptor shoud be a functoin')
    }
    this.onSuccess = [...this.onSuccess, onSuccess].filter(Boolean)
    this.onError = [...this.onError, onError].filter(Boolean)
    return this.removeInterceptor(onSuccess, onError).bind(this)
  }

  run(data) {
    return Promise.resolve(compose(...this.onSuccess)({ ...data }))
      .then(data => this.finalIterceptor ? this.finalIterceptor(data) : data)
  }

  err(data) {
    return Promise.resolve(compose(...this.onError)({ ...data }))
      .then(data => this.finalIterceptor ? this.finalIterceptor(data) : data)
  }

  removeInterceptor(onSuccess, onError) {
    return function() {
      this.onSuccess = this.onSuccess.filter(function(item) { return item !== onSuccess })
      this.onError = this.onError.filter(function(item) { return item !== onError })
    }
  }
}

export function compose(...functions) {
  if(!Array.isArray(functions) || isEmpty(functions)) {
    return (arg) => arg
  }
  if(functions.length === 1) {
    return functions[0]
  }
  return functions.reduce((a, b) => (...args) => a(b(...args)))
}
