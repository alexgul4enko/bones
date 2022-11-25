import { parseIdKey } from '../../utils';
import get from 'lodash/get';

interface Configs {
  key?: string;
  resource?: {
    endpoint: string;
  };
}
export function getIdKey(props: Record<string, any>, { key, resource }: Configs = {}): Record<string, any> | boolean {
  if (!key) {
    return false;
  }
  const idKey: string = parseIdKey(resource?.endpoint);
  if (!idKey) {
    return false;
  }

  if (get(props, idKey)) {
    return { [idKey]: get(props, idKey) };
  }
  if (get(props[key], `data[${idKey}]`)) {
    return { [idKey]: get(props[key], `data[${idKey}]`) };
  }
  return false;
}
