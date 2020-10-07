import ResourceType from './ResourceType'
import useResource from './useResource'

import connectResources, {
  resourcesReducer,
  customResource,
} from './src/resources'

export * from './src/hocs'


export {
  connectResources,
  useResource,
  resourcesReducer,
  ResourceType,
  customResource,
}
