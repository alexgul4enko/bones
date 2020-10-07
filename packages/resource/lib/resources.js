import { connect } from 'react-redux'
import { compile } from 'path-to-regexp'

import omit from 'lodash/omit'
import pick from 'lodash/pick'
import get from 'lodash/get'
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
import { getNameSpace } from './utils'


export const REQUEST = '@resource/request'
export const SET_DATA = '@resource/set-data'
const SET_ERRORS = '@resource/set-errors'
const SET_LOADING = '@resource/set-loading'
const SET_FILTERS = '@resource/set-filters'
const SET_RESOURCE_DATA = '@resource/set-resourceData'
const CLEAR_RESOURCE = '@resource/clear'


export function clear(meta) {
  return {
    type: CLEAR_RESOURCE,
    meta,
  }
}

export function setData(payload, meta) {
  return {
    type: SET_DATA,
    meta,
    payload,
  }
}

function setResourceData(payload, meta) {
  return {
    type: SET_RESOURCE_DATA,
    meta,
    payload,
  }
}

export function setFilters(payload, meta) {
  return {
    type: SET_FILTERS,
    meta,
    payload,
  }
}

export function setErrors(payload, meta) {
  return {
    type: SET_ERRORS,
    meta,
    payload,
  }
}

export function setLoading(payload, meta) {
  return {
    type: SET_LOADING,
    meta,
    payload,
  }
}

function getNameSpaceFromResource(resource) {
  if(typeof resource === 'string') { return getNameSpace(resource) }
  return getNameSpace(resource.namespace)
}


function mapStateToProps(resources) {
  return function(state, props) {
    if(!Array.isArray(resources)) {
      resources = [resources]
    }
    return resources.reduce((res, resource) => {
      const key = getNameSpaceFromResource(resource)
      return {
        ...res,
        [key]: get(state, key, {}),
      }
    }, {})
  }
}

function getMetaFromResource(resource) {
  if(typeof resource === 'string') {
    return {
      endpoint: resource,
      namespace: getNameSpace(resource),
      reducer: 'object',
    }
  }
  return {
    reducer: 'object',
    ...omit(resource, 'queries'),
    endpoint: resource.endpoint || resource.namespace,
    namespace: getNameSpace(resource.namespace),
  }
}

function defaultHTTPRequest(API, payload, meta) {
  return API.request({
    method: meta.type,
    endpoint: meta.endpoint,
    body: omit(payload, meta.queries),
    params: pick(payload, meta.queries),
    signal: meta.signal,
  })
}

function makeRequest(httpRequest) {
  return function request(payload, meta) {
    return (dispatch, getState, { API }) => {
      let {
        type,
        endpoint,
        queries = [],
        forceUpdates,
      } = meta
      if(endpoint.search(/\/:/) > -1) {
        endpoint = compile(endpoint)(payload)
      }

      if(!forceUpdates) {
        dispatch(setResourceData({
          isLoading: true,
          errors: {},
        }, meta))
      }
      if(!isEmpty(queries)) {
        dispatch(setResourceData({
          filters: pick(payload, queries),
        }, meta))
      }
      const controller = new AbortController()
      const wrappedPromise = httpRequest(API, payload, { signal: controller.signal, ...meta, endpoint }, { dispatch, getState })
        .then(response => {
          dispatch(setResourceData({
            [type === 'OPTIONS' ? 'options' : 'data']: response,
            isLoading: false,
          }, meta))
          return response
        })
        .catch(err => {
          if(!forceUpdates) {
            dispatch(setResourceData({ isLoading: false, errors: get(err, 'errors', err) }, meta))
          }
          throw err
        })
      wrappedPromise.cancel = function() { controller.abort() }
      return wrappedPromise
    }
  }
}

const defaultFetch = makeRequest(defaultHTTPRequest)

function makeRequestAction(type, meta, dispatch) {
  return function(payload, actionmeta) {
    return dispatch(defaultFetch(payload, { ...meta, ...actionmeta, type }))
  }
}

function makeSimpleAction(meta, action, dispatch) {
  return (payload, actionmeta = {}) => dispatch(action(payload, { ...meta, ...actionmeta }))
}

function makeClearAction(meta = {}, dispatch) {
  return (actionmeta = {}) => dispatch(clear({ ...meta, ...actionmeta }))
}

export function makeResourceActions(resource, dispatch) {
  const meta = getMetaFromResource(resource)
  const actions = {
    create: makeRequestAction('POST', meta, dispatch),
    fetch: makeRequestAction('GET', { ...meta, queries: resource.queries }, dispatch),
    update: makeRequestAction('PATCH', meta, dispatch),
    remove: makeRequestAction('DELETE', meta, dispatch),
    replace: makeRequestAction('PUT', meta, dispatch),
    fetchOptions: makeRequestAction('OPTIONS', meta, dispatch),
    setData: makeSimpleAction(meta, setData, dispatch),
    setErrors: makeSimpleAction(meta, setErrors, dispatch),
    setLoading: makeSimpleAction(meta, setLoading, dispatch),
    clear: makeClearAction(meta, dispatch),
  }
  if(has(resource, 'queries')) {
    actions.setFilters = makeSimpleAction(meta, setFilters, dispatch)
  }
  return actions
}

function mapDispatchToProps(resources, dispatch) {
  if(!Array.isArray(resources)) {
    resources = [resources]
  }
  return resources.reduce((res, resource) => ({
    ...res,
    [getNameSpaceFromResource(resource)]: makeResourceActions(resource, dispatch),
  }), {})
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  const mergeProps = Object.entries(stateProps).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: {
        ...value,
        ...dispatchProps[key],
      },
    }
  }, {})
  return { ...ownProps, ...mergeProps }
}

export default function connectResources(resource) {
  return connect(
    mapStateToProps(resource),
    dispatch => mapDispatchToProps(resource, dispatch),
    mergeProps,
  )
}

function makeData(reducer, state, payload) {
  if(typeof reducer === 'function') {
    return reducer(get(state, 'data'), payload)
  }
  return defaultReducers[reducer](get(state, 'data'), payload)
}


export function resourcesDataReducer(state = {}, { type, payload = {}, meta = {} }) {
  switch (type) {
    case SET_RESOURCE_DATA:
      const {
        data, errors, isLoading, filters, options,
      } = payload
      return {
        ...state,
        errors: errors || state.errors,
        isLoading: isLoading === undefined ? state.isLoading : isLoading,
        filters: filters || state.filters,
        options: options || state.options,
        data: data ? makeData(get(meta, 'reducer', 'object'), state, data) : state.data,
      }
    case SET_ERRORS:
    case SET_FILTERS:
    case SET_LOADING:
      const dataKey = {
        [SET_ERRORS]: 'errors',
        [SET_FILTERS]: 'filters',
        [SET_LOADING]: 'isLoading',
      }[type]
      return { ...state, [dataKey]: payload }
    case SET_DATA:
      if(meta.type === 'OPTIONS') {
        return ({
          ...state,
          options: get(state, 'options'),
        })
      }
      return ({
        ...state,
        data: makeData(get(meta, 'reducer', 'object'), state, payload),
      })
    default:
      return state
  }
}

const defaultReducers = {
  object: (prev = {}, next) => ({
    ...(prev || {}),
    ...(next || {}),
  }),
  paginationList: (prev = {}, nextData) => {
    if(!has(nextData, 'results')) {
      return {
        ...prev,
        results: get(prev, 'results', []).map(item => (item.uuid === nextData.uuid ? { ...item, ...nextData } : item)),
      }
    }
    const { count, results } = nextData || {}
    return {
      count,
      results: [...get(prev, 'results', []), ...results],
    }
  },
  none: prev => prev,
  replace: (_, next) => next,
}


export function resourcesReducer(state = {}, action) {
  if(action.type === CLEAR_RESOURCE) {
    return omit(state, action.meta.namespace)
  }
  if(action.type.startsWith('@resource/')) {
    return {
      ...state,
      [action.meta.namespace]: resourcesDataReducer(get(state, action.meta.namespace, {}), action),
    }
  }
  return state
}


export function customResource(customFetch) {
  return function customResourceFetch(resource) {
    if(Array.isArray(resource)) {
      throw new Error('custom resource config can not be an array')
    }
    if(typeof resource === 'string') {
      resource = {
        endpoint: resource,
        namespace: getNameSpace(resource),
        reducer: 'object',
      }
    }
    if(!resource.endpoint) {
      resource.endpoint = resource.namespace
    }
    const { namespace, endpoint, queries } = resource
    const customeResourceConnectHOC = connect(
      mapStateToProps(resource),
      dispatch => ({
        [namespace]: {
          ...mapDispatchToProps(resource, dispatch)[namespace],
          customRequest: function(payload, actionmeta) {
            return dispatch(makeRequest(customFetch)(payload, { ...resource, ...actionmeta }))
          },
        },
      }),
      mergeProps,
    )
    customeResourceConnectHOC.namespace = namespace
    customeResourceConnectHOC.endpoint = endpoint
    customeResourceConnectHOC.queries = queries
    return customeResourceConnectHOC
  }
}
