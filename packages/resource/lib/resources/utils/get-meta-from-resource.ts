import { getNameSpace } from '../../utils';
import omit from 'lodash/omit';
import { Reducers } from '../types';

interface ResourceInput {
  endpoint?: string;
  namespace: string;
  reducer?: Reducers;
  queries?: string[];
}

interface ResourceOutput {
  endpoint: string;
  namespace: string;
  reducer: Reducers;
}

/*
 * Function to create actions meta Object from Resource configs
 */
export function getMetaFromResource(resource: string | ResourceInput): ResourceOutput {
  if (typeof resource === 'string') {
    return {
      endpoint: resource,
      namespace: getNameSpace(resource),
      reducer: 'replace'
    };
  }
  return {
    ...omit(resource, 'queries'),
    reducer: resource.reducer || 'replace',
    endpoint: resource.endpoint || resource.namespace,
    namespace: getNameSpace(resource.namespace)
  };
}
