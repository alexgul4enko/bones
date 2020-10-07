import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import pick from 'lodash/pick'
import { init } from './persist'

export default function cacheMiddleware({
  storeKey = 'storage',
  cacheKeys = [],
  storage,
}) {
  return function(store) {
    let persisted = false
    Promise.resolve(storage.getItem(storeKey))
      .then(data => store.dispatch(init(data ? JSON.parse(data) : {})))
      .catch(error => {
        console.error(error)
        store.dispatch(init({}))
      })
      .finally(_ => { persisted = true })
    return next => action => {
      const result = next(action)
      const nextState = store.getState()
      if(persisted) {
        cacheState(
          !isEmpty(cacheKeys) ? pick(nextState, cacheKeys) : nextState,
          storage, storeKey
        )
      }
      return result
    }
  }
}

const cacheState = debounce(function(state, storage, key) {
  storage.setItem(key, JSON.stringify(state))
})
