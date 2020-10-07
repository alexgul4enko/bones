import { connect } from 'react-redux'

function CheckCache({ isInitialized, children }) {
  if(!isInitialized) {
    return null
  }
  return children
}

export default connect(({ isInitialized }) => ({ isInitialized }))(CheckCache)
