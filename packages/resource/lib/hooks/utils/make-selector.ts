import { getNameSpace } from '../../utils';
import get from 'lodash/get';

type Configs =
  | {
      namespace: string;
    }
  | string;

const state = {
  data: null,
  isLoading: false,
  errors: null,
  filters: null,
  options: null
};

export function makeResourceSelector(config: Configs, defaultState: Record<string, any> = state) {
  const namespace = getNameSpace(typeof config === 'string' ? config : config?.namespace);
  return function (state: Record<string, any>) {
    return get(state, namespace, defaultState);
  };
}
