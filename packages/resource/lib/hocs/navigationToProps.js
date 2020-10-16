import { connect } from 'react-redux'
import get from 'lodash/get'
import { QueryParams } from '@cranium/queryparams'
import memoizeOne from 'memoize-one'
const QS = new QueryParams()

const getQueryData = memoizeOne((search, parser) => parser(search))

export default function navigationToProps(parseQueryParams = QS.parseQueryParams) {
  return connect((state, props) => {
    const queryData = getQueryData(get(props, 'location.search'), parseQueryParams)
    const navigationParams = get(props, 'match.params', get(props, 'navigation.state.params', {})) || {}
    return {
      ...navigationParams,
      ...queryData,
    }
  })
}
