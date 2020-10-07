import { connect } from 'react-redux'
import get from 'lodash/get'
import { QueryParams } from '@cranium/queryparams'
const QS = new QueryParams()


export default function navigationToProps(parseQueryParams = QS.parseQueryParams) {
  return connect((state, props) => {
    const queryData = get(props, 'location.search') ? parseQueryParams(get(props, 'location.search')) : {}
    const navigationParams = get(props, 'match.params', get(props, 'navigation.state.params', {})) || {}
    return {
      ...navigationParams,
      ...queryData,
    }
  })
}
