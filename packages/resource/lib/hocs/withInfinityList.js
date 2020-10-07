import { Component } from 'react'
import { compose } from 'redux'
import { parse } from 'path-to-regexp'
import connectResources from '../resources'
import get from 'lodash/get'
import has from 'lodash/has'
import pick from 'lodash/pick'
import noop from 'lodash/noop'
import { Loader, mergeConfigs, makePromiseSubscription, getNameSpace , promiseDebounce} from '../utils'


const defaultConfigs = {
  prefetch: true,
  destroyOnUnmount: true,
  refresh: true,
  Loader,
  defaultParams: {
    limit: 20,
  },
}

export default function withInfinityList(resources, configs) {
  let resource = resources
  if(Array.isArray(resource)) {
    throw new Error('withFormResource HOC could acceps only 1 resource')
  }
  if(typeof resource === 'function' && !resource.namespace) {
    throw new Error('resource should be a HOC that returns from customResource function')
  }
  const key = get(resource, 'namespace', resource)
  if(!key) {
    throw new Error('namespace is fequired')
  }
  if(typeof resource === 'string') {
    resource = {
      namespace: resource,
      endpoint: resource,
      queries: ['offset', 'limit'],
    }
  }
  if(!resource.endpoint) {
    resource.endpoint = resource.namespace
  }
  if(!resource.queries) {
    resource.queries = ['offset', 'limit']
  }
  return compose(
    typeof resource === 'function' ? resource : connectResources(resource),
    withList(getNameSpace(key), resource, mergeConfigs(defaultConfigs, configs)),
  )
}

function withList(key, resource, configs) {
  return function(ChildComponent) {
    return class InfinityList extends Component {
      constructor(props) {
        super(props)
        this.getRequestFunction = this.getRequestFunction.bind(this)
        this.cancellRequest = this.cancellRequest.bind(this)
        this.loadNext = this.loadNext.bind(this)
        this.refresh = this.refresh.bind(this)
        this.getapiDatafromProps = this.getapiDatafromProps.bind(this)
        this.onSearch = promiseDebounce(this.handleSearch.bind(this), 300)

        const initialLoading = configs.refresh || (!has(get(props, `[${key}].data`)) && !has(get(props, `[${key}].errors`)))
        this.state = {
          initialLoading,
          isRefreshing: false,
        }
      }

      componentDidMount() {
        if(!configs.prefetch) { return }
        if(!this.state.initialLoading) { return }
        const request = this.getRequestFunction()
        if(!request) { return }

        this.request = request({
          offset: 0,
          ...get(configs, 'defaultParams', {}),
          ...this.getapiDatafromProps(),
        }, { reducer: 'replace', forceUpdates: true })
        this.subscription = makePromiseSubscription([this.request])
        this.subscription
          .then(() => this.setState({ initialLoading: false }))
          .catch(noop)
      }

      getapiDatafromProps() {
        const urlConfigs = (parse(resource.endpoint || '') || [])
          .filter(item => typeof item !== 'string')
          .map(({ name }) => name) || {}
        return pick(this.props, [...urlConfigs, ...get(resource, 'queries', [])]) || {}
      }


      getRequestFunction() {
        return get(this.props[key], 'customRequest') || get(this.props[key], 'fetch')
      }

      cancellRequest() {
        if(this.request && this.request.cancel && typeof this.request.cancel === 'function') {
          this.request.cancel()
        }
      }

      handleSearch(search = {}, apiParams) {
        this.cancellRequest()
        const request = this.getRequestFunction()
        if(!request) { return }
        this.request = request({
          ...get(this.props[key], 'filters', {}),
          offset: 0,
          ...search,
        }, { reducer: 'replace', ...(apiParams || {}) })
        return this.request
      }

      loadNext() {
        const request = this.getRequestFunction()
        if(!request) { return }
        if(get(this.props[key], 'isLoading')) {
          console.warn('InfinitiList: can not load next page while processing previous request')
          return
        }
        let { limit, offset } = get(this.props[key], 'filters', {})
        limit = parseInt(limit, 10)
        offset = parseInt(offset, 10)
        if((offset + limit) >= get(this.props[key], 'data.count', 0)) { return }
        this.request = request({ ...get(this.props[key], 'filters', {}), offset: offset + limit }, { reducer: 'paginationList' })
        return this.request
      }

      refresh(filters = {}, apiParams = { forceUpdates: true }) {
        this.setState({ isRefreshing: true })
        this.request = this.handleSearch(filters, apiParams)
        this.subscription = makePromiseSubscription([this.request])
        this.subscription
          .then(() => this.setState({ isRefreshing: false }))
          .catch(noop)
        return this.request
      }

      componentWillUnmount() {
        this.subscription && this.subscription.cancel && this.subscription.cancel()
        this.cancellRequest()
        if(configs.destroyOnUnmount) { this.props[key].clear() }
      }

      render() {
        const { Loader } = configs
        return (
          <Loader isLoading={this.state.initialLoading}>
            <ChildComponent
              {...this.props}
              {...this.state}
              onSearch={this.onSearch}
              loadNext={this.loadNext}
              onRefresh={this.refresh}
            />
          </Loader>
        )
      }
    }
  }
}
