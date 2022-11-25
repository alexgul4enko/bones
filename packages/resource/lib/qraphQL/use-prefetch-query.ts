import { usePrefetchRequest } from '../hooks';
import { getConfigs, Configs } from './get-configs';
import { request } from './request';
import get from 'lodash/get';
import { DocumentNode } from 'graphql';

/*
 * HOOK to connect GRAPHGL resource
 * send initial HTTP Request
 * automatically terminate request on unmount
 * clear resource data on unmount
 */
export function usePrefetchQuery<DataType = {}, ErrorType = {}, FilterType = {}, OptionsType = {}>(
  query: DocumentNode,
  configs: null | undefined | Configs = {}
) {
  return function (filters: Record<string, unknown> = {}) {
    const requestConfig = getConfigs(query, configs);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return usePrefetchRequest<DataType, ErrorType, FilterType, OptionsType>(request as any, requestConfig, {
      filters,
      destroyOnUnmount: get(configs, 'destroyOnUnmount')
    });
  };
}
