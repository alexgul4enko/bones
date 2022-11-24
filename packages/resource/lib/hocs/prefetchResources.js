import { Component } from 'react';
import { compose } from 'redux';
import { parse } from 'path-to-regexp';
import connectResources from '../resources';
import get from 'lodash/get';
import pick from 'lodash/pick';
import has from 'lodash/has';
import { mergeConfigs, makePromiseSubscription, Loader, getNameSpace } from '../utils';

const defaultConfigs = {
  destroyOnUnmount: true,
  refresh: true,
  defaultParams: {},
  Loader
};

export default function prefetchResources(resources, configs) {
  const _resources = Array.isArray(resources) ? resources : [resources];
  const resourcesList = _resources.filter((item) => typeof item !== 'function');
  const customResources = _resources.filter((item) => typeof item === 'function');
  return compose(
    ...customResources,
    connectResources(resourcesList),
    prefetch(_resources, mergeConfigs(defaultConfigs, configs))
  );
}

export function prefetch(resources, configs) {
  return function (ChildComponent) {
    return class Prefetch extends Component {
      constructor(props) {
        super(props);
        this.getResources = this.getResources.bind(this);
        const initialLoading =
          configs.refresh || this.getResources().findIndex(({ resource }) => !has(resource, 'data')) !== -1;
        this.state = {
          initialLoading: configs.idKey ? !!props[configs.idKey] : initialLoading
        };
      }

      getResources() {
        return resources
          .map((resource) => {
            if (typeof resource === 'string') {
              resource = getNameSpace(resource);
              return { resource: this.props[resource], config: { endpoint: resource } };
            }
            resource.namespace = getNameSpace(resource.namespace);
            if (typeof resource === 'function') {
              if (typeof get(this.props, `[${resource.namespace}].customRequest`) !== 'function') {
                return undefined;
              }
            }
            return { resource: this.props[resource.namespace], config: resource };
          })
          .filter(Boolean);
      }

      componentDidMount() {
        if (!this.state.initialLoading) {
          return;
        }
        this.fetchList = this.getResources().map(({ resource, config }) => {
          const urlConfigs =
            (parse(config.endpoint || '') || []).filter((item) => typeof item !== 'string').map(({ name }) => name) ||
            [];
          const apiDatafromProps = pick(this.props, [...urlConfigs, ...get(config, 'queries', [])]);
          const request = resource.customRequest
            ? resource.customRequest
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
        this.subscription && this.subscription.cancel && this.subscription.cancel();
        if (Array.isArray(this.fetchList)) {
          this.fetchList.forEach((item) => {
            if (item && item.cancel && typeof item.cancel === 'function') {
              item.cancel();
            }
          });
        }
        if (configs.destroyOnUnmount) {
          this.getResources().forEach(({ resource }) => resource.clear());
        }
      }

      render() {
        const { Loader } = configs;
        return (
          <Loader isLoading={this.state.initialLoading}>
            <ChildComponent {...this.props} {...this.state} />
          </Loader>
        );
      }
    };
  };
}
