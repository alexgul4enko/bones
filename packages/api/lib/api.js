import defaultConfigs from './defaults'
import get from 'lodash/get'
import has from 'lodash/has'
import omit from 'lodash/omit'
import { buildUrl, mergeConfigs } from './utils'


export default class API {
  constructor(configs) {
    const options = mergeConfigs(configs, defaultConfigs)
    this.options = omit(options, 'interceptors')
    this.interceptors = options.interceptors
  }

  request(requestParams) {
    const {
      baseURL = this.options.baseURL,
      endpoint = '',
      params,
      method = 'GET',
      headers = {},
      body = {},
      ...restOptions
    } = requestParams
    const url = buildUrl(baseURL, endpoint, params, this.options.paramsSerializer)
    const _headers = new Headers(Object.assign({}, this.options.headers, headers))
    const _isMultipartFormData = this.options.isMultipartFormData(body)
    if(_isMultipartFormData) {
      _headers.delete('Content-Type')
    }

    const fetchParams = Object.assign({}, restOptions || {}, omit(this.options, Object.keys(defaultConfigs)))

    const _body = method === 'GET' ? undefined : this.options.prepareBody(body, _isMultipartFormData)
    const options = {
      method,
      headers: _headers,
      body: _body,
      ...fetchParams,
    }

    return this.interceptors.request.run({ ...options, url })
      .catch(error => {
        return this.interceptors.request.err({ ...options, url, error })
      })
      .then(({ url, ...opts }) => {
        const request = new Request(url, opts)
        return fetch(request)
      })
      .then(response => {
        return handleResponseCallback(response)
      })
      .then(data => {
        if(get(data, 'response.ok')) {
          return data
        }
        return Promise.reject(data)
      })
      .then(data => {
        return this.interceptors.response.run(data)
      })
      .catch(err => {
        if(get(err, 'code') === 20) {
          return Promise.reject({ errors: { code: err.code, message: err.message, name: err.name } })
        }
        return this.interceptors.response.err(err).then(err => { throw err })
      })
  }

  get(endpoint, params = {}) {
    return this.request(makeParams(endpoint, params, 'GET'))
  }

  post(endpoint, body = {}, params = {}) {
    return this.request(makeBodyParams(endpoint, body, params, 'POST'))
  }

  put(endpoint, body = {}, params = {}) {
    return this.request(makeBodyParams(endpoint, body, params, 'PUT'))
  }

  patch(endpoint, body = {}, params = {}) {
    return this.request(makeBodyParams(endpoint, body, params, 'PATCH'))
  }

  options(endpoint, params = {}) {
    return this.request(makeParams(endpoint, params, 'OPTIONS'))
  }

  delete(endpoint, params = {}) {
    return this.request(makeParams(endpoint, params, 'DELETE'))
  }
}


function checkUrl(url, params = {}) {
  if(!url) {
    throw new Error(`endpoint is required but got: ${url}`)
  }
  if(typeof url === 'object' && !has(url, 'endpoint')) {
    throw new Error(`endpoint is required but got: ${url.endpoint}`)
  }
  if(typeof url === 'string' && !url) {
    throw new Error(`endpoint is required but got: ${params.endpoint}`)
  }
}

function makeParams(url, params = {}, method) {
  checkUrl(url, params)
  if(typeof url === 'string') {
    return { ...(params || {}), endpoint: url, method }
  }
  return { ...(url || {}), method }
}

function makeBodyParams(url, body = {}, params = {}, method) {
  checkUrl(url, params)
  if(typeof url === 'string') {
    return { ...(params || {}), endpoint: url, body, method }
  }
  return { ...(url || {}), body, method }
}


function handleResponseCallback(response) {
  if(response && response.headers && response.headers.get && (response.headers.get('Content-Type') || '').includes('application/json')) {
    return response.json().then(data => ({ data, response }))
  }
  return { response }
}
