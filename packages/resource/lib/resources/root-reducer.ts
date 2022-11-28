import omit from 'lodash/omit';
import get from 'lodash/get';
import { resourcesDataReducer } from './data-reducer';
import { CLEAR_RESOURCE } from './actions';
import { AnyAction } from 'redux';

/*
 * root resource reducer
 */
export function resourcesReducer(state: Record<string, any> = {}, action: AnyAction) {
  if (action.type === CLEAR_RESOURCE) {
    return omit(state, action.meta.namespace);
  }
  if (typeof action.type === 'string' && action.type.startsWith('@resource/')) {
    return {
      ...state,
      [action.meta.namespace]: resourcesDataReducer(get(state, action.meta.namespace, {}), action)
    };
  }
  return state;
}
