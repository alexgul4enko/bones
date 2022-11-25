import { useCustomRequest } from '../hooks';
import { request } from './request';
import { DocumentNode } from 'graphql';
import { getConfigs, Configs } from './get-configs';

/*
 * HOOK to connect REST API resource
 */

export function useQuery<DataType = {}, ErrorType = {}, FilterType = {}, OptionsType = {}>(
  query: DocumentNode,
  configs?: Configs
) {
  const requestConfig = getConfigs(query, configs || {});
  return useCustomRequest<DataType, ErrorType, FilterType, OptionsType>(request as any, requestConfig);
}
