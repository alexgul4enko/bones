import { getNameSpace } from '../../utils'
import get from 'lodash/get'


export default function makeResourceSelector(config, defaultState = {}) {
  const namespace = getNameSpace(get(config, 'namespace', config))
  return function(state) {
    return get(state, namespace, defaultState)
  }
}
