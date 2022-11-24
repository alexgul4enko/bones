import pick from 'lodash/pick';

export const RESET_STORE = 'RESET_STORE';

export function reset() {
  return {
    type: RESET_STORE
  };
}

/*
 * reducer to clear redux store.
 * common uusage - Log out
 * this reducer will clear redux store exept whiteList options
 */
export function persistReducer(whiteList: string[] = []) {
  return function (state = {}, action: any) {
    switch (action.type) {
      case RESET_STORE:
        return pick(state, whiteList);
      default:
        return state;
    }
  };
}
