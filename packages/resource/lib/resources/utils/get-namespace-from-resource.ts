import { getNameSpace } from '../../utils';

type Resource =
  | string
  | {
      namespace: string;
    };
/*
 * functoin to get namespace from Resource config
 */
export function getNameSpaceFromResource(resource: Resource): string {
  if (typeof resource === 'string') {
    return getNameSpace(resource);
  }
  return getNameSpace(resource.namespace);
}
