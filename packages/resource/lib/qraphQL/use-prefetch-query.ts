import { usePrefetchRequest } from '../hooks';
import { getConfigs, Configs } from './get-configs';
import { request } from './request';
import get from 'lodash/get';
import { DocumentNode } from 'graphql';
import { CustomRequestType } from '../hooks/types'

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
  var ttt= typeof configs === 'object'  && typeof configs?.transformValue === 'function'? configs.transformValue : () => 6
  return function (filters: FilterType) {
    const requestConfig = getConfigs(query, configs);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return usePrefetchRequest<DataType, ErrorType, FilterType, OptionsType>(request as any, requestConfig, {
      filters,
      destroyOnUnmount: get(configs, 'destroyOnUnmount')
    }) as {
      isLoading: boolean;
      data?: DataType | null;
      errors?: ErrorType | null;
      filters?: FilterType | null;
      options: OptionsType | null;
      request: CustomRequestType<ReturnType<typeof ttt>, FilterType, Configs>;
    };
  };
}
