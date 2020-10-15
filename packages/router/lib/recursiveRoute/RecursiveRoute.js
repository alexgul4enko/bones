import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Redirect } from '../Links'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import wrapRoute from './utils/wrapRoute'
import relativePath from './utils/relativePath'

RecursiveRoute.propTypes = {
  access: PropTypes.string,
  layout: PropTypes.elementType,
  component: PropTypes.elementType,
  routes: PropTypes.array,
  redirectTo: PropTypes.string,
  notFountUrl: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.object,
  }),
  match: PropTypes.object,
  interceptors: PropTypes.array,
}

RecursiveRoute.defaultProps = {
  access: undefined,
  layout: undefined,
  component: undefined,
  routes: undefined,
  redirectTo: undefined,
  match: undefined,
  location: undefined,
  interceptors: undefined,
}


export default function RecursiveRoute({
  notFountUrl,
  layout,
  component: Component,
  routes,
  redirectTo,
  interceptors = [],
  ...route
}) {
  return wrapRoute(
    route,
    layout,
    ...interceptors
  )(
    <Route {...route}>
      {getRouteComponent({ redirectTo, routes, route, Component, notFountUrl, interceptors })}
    </Route>
  )
}

function getRouteComponent({ redirectTo, routes, route, Component, notFountUrl, interceptors }) {
  if(redirectTo) {
    return <Redirect to={redirectTo} />
  }
  if(Array.isArray(routes) && !isEmpty(routes)) {
    return (
      <Switch>
        {routes.map((r, i) => (
          <RecursiveRoute notFountUrl ={notFountUrl}key={i} {...r} path={relativePath(route.path, r.path)} interceptors={interceptors}/>
        ))}
        <Route path="*"><Redirect to={notFountUrl} /></Route>
      </Switch>
    )
  }
  return <Component/>
}
