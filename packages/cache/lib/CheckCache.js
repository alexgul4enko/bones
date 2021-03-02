import PropTypes from 'prop-types'
import { connect } from 'react-redux'

CheckCache.propTypes = {
  isInitialized: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

CheckCache.defaultProps = {
  isInitialized: false,
}

function CheckCache({ isInitialized, children }) {
  if(!isInitialized) {
    return null
  }
  return children
}

export default connect(({ isInitialized }) => ({ isInitialized }))(CheckCache)
