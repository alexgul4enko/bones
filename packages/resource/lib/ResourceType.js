import PropTypes from 'prop-types'

const ResourceType = PropTypes.shape({
  create: PropTypes.func,
  fetch: PropTypes.func,
  fetchOptions: PropTypes.func,
  remove: PropTypes.func,
  replace: PropTypes.func,
  update: PropTypes.func,
  setData: PropTypes.func,
  setErrors: PropTypes.func,
  setLoading: PropTypes.func,
  setFilters: PropTypes.func,
  clear: PropTypes.func,
  isLoading: PropTypes.bool,
  options: PropTypes.object,
  filters: PropTypes.object,
  errors: PropTypes.object,
  data: PropTypes.any,
})

export default ResourceType
