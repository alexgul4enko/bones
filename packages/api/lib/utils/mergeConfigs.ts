import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';
import { BaseConfigsType } from '../types';

export function mergeConfigs(
  configs: Partial<BaseConfigsType> = {},
  defaultConfigs: Partial<BaseConfigsType>
): BaseConfigsType {
  if (isEmpty(configs)) {
    return defaultConfigs;
  }
  const keys = uniq([...Object.keys(configs), ...Object.keys(defaultConfigs)]);
  const results = keys.reduce(function (res, key) {
    return {
      ...res,
      [key]: configs[key] || defaultConfigs[key]
    };
  }, {});

  return results;
}
