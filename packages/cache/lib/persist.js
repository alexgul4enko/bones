import pick from 'lodash/pick'
export const INIT_STORE = 'INIT_STORE'
export const RESET_STORE = 'RESET_STORE'

export function init(payload) {
  return {
    type: INIT_STORE,
    payload,
  }
}

export function reset() {
  return {
    type: RESET_STORE,
  }
}


export default function persistReducer(whiteList = []) {
  return function(state, action) {
    switch (action.type) {
      case INIT_STORE:
        return { ...state, ...action.payload, isInitialized: true }
      case RESET_STORE:
        return pick(state, Array.isArray(whiteList) ? [...whiteList, 'isInitialized'] : ['isInitialized'])
      default:
        return state
    }
  }
}
