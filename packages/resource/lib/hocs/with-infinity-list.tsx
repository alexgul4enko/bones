import { Component, ComponentType, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';
import { parse } from 'path-to-regexp';
import { connectResources, CustomResourceHOC, FetchMeta } from '../resources';
import get from 'lodash/get';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import { getFilters } from './utils';
import { Loader, mergeConfigs, makePromiseSubscription, getNameSpace, promiseDebounce } from '../utils';
import { ResourcesConfigType, ResourcesType } from '../types';
import { PrefetchOptions, DefaultOption } from './types';

interface InfinityListDefaultOption extends DefaultOption {
  prefetch: boolean;
  getFilters: (props: { [key: string]: unknown }, key: string) => { [key: string]: unknown } | null | undefined;
}

interface InfinityListOptions extends PrefetchOptions {
  prefetch?: boolean;
  getFilters?: (props: { [key: string]: unknown }, key: string) => { [key: string]: unknown } | null | undefined;
}

const defaultConfigs: InfinityListDefaultOption = {
  prefetch: true,
  destroyOnUnmount: true,
  refresh: true,
  Loader,
  getFilters,
  defaultParams: {
    limit: 20
  }
};

export interface InifinyProps {
  onSearch: (params: Record<string, any>, meta?: ResourcesType) => void;
  loadNext: () => void;
  onRefresh: () => void;
  initialLoading: boolean;
  isRefreshing: boolean;
}

/*
 * React HOC to work with infinity lists
 * Spec:
 * Send initial HTTP request and automatically terminate on Component unmount
 * Pass props to child Component:
 * loadNext void to load next patch of data if it is available
 * onRefresh void to refrech list data
 * onSearch void that implements onair search
 */

export function withInfinityList<PropTypes = {}>(
  resources: ResourcesConfigType | CustomResourceHOC,
  configs?: InfinityListOptions
) {
  let resource = resources;
  if (typeof resource === 'function' && !resource.namespace) {
    throw new Error('resource should be a HOC that returns from customResource function');
  }
  const key = typeof resource === 'string' ? resource : resource.namespace;
  if (!key) {
    throw new Error('namespace is required');
  }
  if (typeof resource === 'string') {
    resource = {
      namespace: resource,
      endpoint: resource,
      queries: ['offset', 'limit']
    };
  }
  if (!resource.endpoint) {
    resource.endpoint = resource.namespace;
  }
  if (!resource.queries) {
    resource.queries = ['offset', 'limit'];
  }
  const mergedConfigs: InfinityListDefaultOption = mergeConfigs(defaultConfigs, configs) as InfinityListDefaultOption;
  return compose(
    typeof resource === 'function' ? resource : connectResources(resource),
    withList(getNameSpace(key), resource, mergedConfigs)
  ) as any as (comp: FC<any>) => FC<PropsWithChildren<PropTypes>>;
}

function withList(key: string, resource: ResourcesType | CustomResourceHOC, configs: InfinityListDefaultOption) {
  return function <P = {}>(ChildComponent: ComponentType<P>) {
    return class InfinityList extends Component<P, { initialLoading: boolean; isRefreshing: boolean }> {
      onSearch: any;
      subscription: any;
      request: any;
      pending: boolean;
      constructor(props: P) {
        super(props);
        this.pending = false;
        this.request = null;
        this.getRequestFunction = this.getRequestFunction.bind(this);
        this.cancellRequest = this.cancellRequest.bind(this);
        this.loadNext = this.loadNext.bind(this);
        this.refresh = this.refresh.bind(this);
        this.getapiDatafromProps = this.getapiDatafromProps.bind(this);
        this.onSearch = promiseDebounce(this.handleSearch.bind(this), 300);

        const initialLoading = configs.refresh || (!get(props, `[${key}].data`) && !get(props, `[${key}].errors`));
        this.state = {
          initialLoading,
          isRefreshing: false
        };
      }

      componentDidMount() {
        if (!configs.prefetch) {
          return;
        }
        if (!this.state.initialLoading) {
          return;
        }
        const request = this.getRequestFunction();
        if (!request) {
          return;
        }

        this.request = request(
          {
            ...get(configs, 'defaultParams', {}),
            ...this.getapiDatafromProps()
          },
          { reducer: 'replace', forceUpdates: true }
        );
        this.subscription = makePromiseSubscription([this.request]);
        this.subscription.catch(noop).finally(() => this.setState({ initialLoading: false }));
      }

      getapiDatafromProps() {
        const urlConfigs =
          (parse(resource.endpoint || '') || [])
            .filter((item) => typeof item !== 'string')
            .map(({ name }: any) => name) || {};
        return pick(this.props, [...(urlConfigs as string[]), ...get(resource, 'queries', [])]) || {};
      }

      getRequestFunction() {
        return get(get(this.props, key), 'request') || get(get(this.props, key), 'fetch');
      }

      cancellRequest() {
        if (this.request && typeof get(this.request, 'cancel') === 'function') {
          get(this.request, 'cancel')();
        }
      }

      handleSearch(search: Record<string, any> = {}, apiParams: FetchMeta) {
        this.cancellRequest();
        const request = this.getRequestFunction();
        if (!request) {
          return;
        }
        this.request = request(
          {
            ...get(get(this.props, key), 'filters', {}),
            offset: 0,
            ...search
          },
          { reducer: 'replace', ...(apiParams || {}) }
        );
        return this.request;
      }

      loadNext() {
        const request = this.getRequestFunction();
        if (!request) {
          return;
        }
        if (this.pending) {
          // eslint-disable-next-line no-console
          console.warn('InfinitiList: can not load next page while processing previous request');
          return;
        }
        const filters = configs.getFilters(this.props, key);
        if (isEmpty(filters)) {
          return;
        }

        this.pending = true;
        this.request = request(
          {
            ...get(get(this.props, key), 'filters', {}),
            ...filters
          },
          { reducer: 'infinityList' }
        );
        this.request.finally(() => (this.pending = false));
        return this.request;
      }

      refresh(filters = {}, apiParams = { forceUpdates: true }) {
        this.setState({ isRefreshing: true });
        this.request = this.handleSearch(filters, apiParams);
        this.subscription = makePromiseSubscription([this.request]);
        this.subscription.then(() => this.setState({ isRefreshing: false })).catch(noop);
        return this.request;
      }

      componentWillUnmount() {
        this.subscription && this.subscription.cancel && this.subscription.cancel();
        this.cancellRequest();
        if (configs.destroyOnUnmount) {
          get(this.props, key).clear();
        }
      }

      render() {
        const { Loader } = configs;
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
        );
      }
    };
  };
}
