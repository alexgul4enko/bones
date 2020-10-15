import PropTypes from 'prop-types'
import { useContext, useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { RouterConfigContext } from '../routerConfig'
import { compile, parse } from 'path-to-regexp'
import { QueryParams } from '@cranium/queryparams'

const QS = new QueryParams()


export default function NamedLink(LinkComponent) {
  LinkWrapped.propTypes = {
    to: PropTypes.string.isRequired,
    state: PropTypes.object,
  }

  LinkWrapped.defaultProps = {
    state: {},
  }

  function LinkWrapped({ to, state, search, ...props }) {
    const namedRoutes = useContext(RouterConfigContext)
    let path = get(namedRoutes, to, '')
    if(!path && !isEmpty(namedRoutes)) {
      throw new Error('no route with name: ' + to)
    }
    if(path.includes(':')) {
      path = compile(path)(props)
    }
    const omitProps = useMemo(() => parse(get(namedRoutes, to, '')).filter(item => item.name).map(({ name }) => name), [path])
    const _search = useMemo(() => {
      if(typeof search === 'object') {
        return QS.buildQueryParams(search)
      }
      return search
    }, [search])
    const _to = useMemo(() => ({
      pathname: path, state, search: _search,
    }), [path, state, _search])
    return <LinkComponent to={_to} {...omit(props, omitProps)} />
  }
  return LinkWrapped
}
