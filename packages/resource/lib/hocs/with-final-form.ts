import { FC, PropsWithChildren } from 'react';
import { finalForm, FormConfigs } from './finalForm';
import { compose } from 'redux';
import { connectResources, CustomResourceHOC } from '../resources';
import { prefetchResources } from './prefetch-resources';
import get from 'lodash/get';
import { mergeConfigs, getNameSpace, Loader, parseIdKey } from '../utils';
import { ResourcesConfigType } from '../types';
import { PrefetchOptions, DefaultOption } from './types';

interface FormDefaultOption extends DefaultOption {
  prefetch: boolean;
}

interface FormOptionalOptions extends PrefetchOptions {
  prefetch?: boolean;
}

const defaultConfigs: FormDefaultOption = {
  prefetch: true,
  destroyOnUnmount: true,
  refresh: false,
  defaultParams: {},
  Loader
};

/*
 * React HOC to work with forms using react-final-form npm module
 * Wrap Component with Form Provider
 * Wrap Component with Resources
 * Add special Form configs
 */

export function withFinalForm<PropTypes = {}>(
  form: FormConfigs = {},
  resource: ResourcesConfigType | CustomResourceHOC,
  configs: FormOptionalOptions
) {
  if (typeof resource === 'function' && !resource.namespace) {
    throw new Error('resource should be a HOC that returns from customResource function');
  }
  const key = getNameSpace(typeof resource === 'string' ? resource : resource.namespace);
  if (!key) {
    throw new Error('namespace is fequired');
  }
  const _configs: FormDefaultOption = mergeConfigs(defaultConfigs, configs) as FormDefaultOption;
  const idKey = parseIdKey(get(resource, 'endpoint') || key);
  const resourceConfigs: { endpoint: string } =
    typeof resource === 'string' ? { endpoint: resource } : { endpoint: get(resource, 'endpoint') || '' };
  return compose(
    get(configs, 'prefetch') !== false
      ? prefetchResources(resource, { ..._configs, idKey })
      : typeof resource === 'function'
      ? resource
      : connectResources(resource),
    finalForm(form, {
      key,
      resource: resourceConfigs
    })
  ) as any as (comp: FC<any>) => FC<PropsWithChildren<PropTypes>>;
}
