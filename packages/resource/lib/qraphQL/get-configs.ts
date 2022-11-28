import { useMemo } from 'react';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { CacheConfig } from '@cranium/cache';
import { DocumentNode, OperationDefinitionNode, VariableDefinitionNode } from 'graphql';
type ParseFunctionType = string | ((value: Record<string, any>) => Record<string, any>);
export type Configs =
  | {
      namespace?: string;
      destroyOnUnmount?: boolean;
      transformValue?: ParseFunctionType;
      transformErrors?: ParseFunctionType;
      endpoint?: string;
      baseURL?: string;
      cache?: CacheConfig;
      [key: string]: any;
    }
  | string;

export type ReturnConfigs =
  | {
      namespace: string;
      queries?: string[];
      query: string | Record<string, any>;
      [key: string]: any;
    }
  | string;

export function getConfigs(query: DocumentNode, configs: Configs) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo<ReturnConfigs>(() => {
    if (typeof configs === 'string') {
      return { endpoint: '/', namespace: configs, query };
    }
    const namespace =
      configs.namespace || (get(query, 'definitions[0]', {}) as OperationDefinitionNode).name?.value || '';
    const queries = (get(query, 'definitions[0]', {}) as OperationDefinitionNode).variableDefinitions?.map(
      (variable: VariableDefinitionNode) => variable.variable.name.value
    );
    return {
      queries,
      query,
      endpoint: '/',
      ...omit(configs, 'destroyOnUnmount'),
      namespace
    };
  }, [configs, query]);
}
