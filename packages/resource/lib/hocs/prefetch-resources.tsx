import { Component, ComponentType, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';
import { parse, Key } from 'path-to-regexp';
import { connectResources, CustomResourceHOC } from '../resources';
import get from 'lodash/get';
import pick from 'lodash/pick';
import has from 'lodash/has';
import { mergeConfigs, makePromiseSubscription, Loader, getNameSpace, CancelablePromise } from '../utils';
import { ResourcesConfigType } from '../types';
import { PrefetchOptions, DefaultOption } from './types';

const defaultConfigs: DefaultOption = {
  destroyOnUnmount: true,
  refresh: true,
  defaultParams: {},
  Loader
};

type PrefetchResources = ResourcesConfigType | CustomResourceHOC;

/*
 * React HOC to send initial Request
 * Spec:
 * Send initial HTTP request and automatically terminate on Component unmount
 * Could send several API request using Promise.all
 * Could call custom async function using customResource API
 */

export function prefetchResources<PropTypes = {}>(
  resources: PrefetchResources | PrefetchResources[],
  configs?: PrefetchOptions
) {
  const _resources = Array.isArray(resources) ? resources : [resources];
  const resourcesList: ResourcesConfigType[] = _resources.filter(
    (item) => typeof item !== 'function'
  ) as ResourcesConfigType[];
  const customResources: CustomResourceHOC[] = _resources.filter(
    (item) => typeof item === 'function'
  ) as CustomResourceHOC[];
  const mergedConfigs: DefaultOption = mergeConfigs(defaultConfigs, configs) as DefaultOption;
  return compose(...customResources, connectResources(resourcesList), prefetch(_resources, mergedConfigs)) as any as (
    comp: FC<any>
  ) => FC<PropsWithChildren<PropTypes>>;
}

function prefetch(resources: PrefetchResources[], configs: DefaultOption) {
  return function <P = {}>(ChildComponent: ComponentType<P>) {
    return class Prefetch extends Component<P, { initialLoading: boolean }> {
      fetchList: CancelablePromise[] | undefined;
      subscription: CancelablePromise | undefined;
      constructor(props: P) {
        super(props);
        this.getResources = this.getResources.bind(this);
        const initialLoading =
          configs.refresh || this.getResources().findIndex((item) => !has(item, 'resource.data')) !== -1;
        this.state = {
          initialLoading: configs.idKey ? !!get(props, configs.idKey) : initialLoading
        };
      }

      getResources() {
        return resources
          .map((resource: PrefetchResources) => {
            if (typeof resource === 'string') {
              const resourceName = getNameSpace(resource);
              return { resource: get(this.props, resourceName), config: { endpoint: resource } };
            }
            resource.namespace = getNameSpace(resource.namespace);
            if (typeof resource === 'function') {
              if (typeof get(this.props, `[${resource.namespace}].request`) !== 'function') {
                return false;
              }
            }
            return { resource: get(this.props, resource.namespace), config: resource };
          })
          .filter(Boolean);
      }

      componentDidMount() {
        if (!this.state.initialLoading) {
          return;
        }
        this.fetchList = this.getResources().map(({ resource, config }: any) => {
          const urlConfigs =
            (parse(config.endpoint || '') || [])
              .filter((el: string | Key): el is Key => typeof el === 'object')
              .map(({ name }) => name) || [];
          const apiDatafromProps = pick(this.props, [...urlConfigs, ...get(config, 'queries', [])]);
          const request = resource.request
            ? resource.request
            : get(configs, 'method') === 'POST'
            ? resource.create
            : resource.fetch;
          return request(
            {
              ...get(configs, 'defaultParams', {}),
              ...apiDatafromProps
            },
            { type: 'PREFETCH' }
          );
        });
        this.subscription = makePromiseSubscription(this.fetchList);
        this.subscription.finally(() => this.setState({ initialLoading: false }));
      }

      componentWillUnmount() {
        this.subscription?.cancel();
        if (Array.isArray(this.fetchList)) {
          this.fetchList.forEach((item) => {
            if (typeof item?.cancel === 'function') {
              item.cancel();
            }
          });
        }
        if (configs.destroyOnUnmount) {
          this.getResources().forEach(({ resource }: any) => resource?.clear?.apply());
        }
      }

      render() {
        const LoaderComponent = configs.Loader;
        return (
          <LoaderComponent isLoading={this.state.initialLoading}>
            <ChildComponent {...(this.props as P)} {...this.state} />
          </LoaderComponent>
        );
      }
    };
  };
}
