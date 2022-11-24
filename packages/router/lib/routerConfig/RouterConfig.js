import PropTypes from 'prop-types';
import { createContext, useMemo } from 'react';
import routesMap from './utils/routesMap';

export const RouterConfigContext = createContext({});

RouterConfig.propTypes = {
  routes: PropTypes.array.isRequired,
  children: PropTypes.node
};

RouterConfig.defaultProps = {
  children: undefined
};

export default function RouterConfig({ routes, children }) {
  const value = useMemo(() => routesMap(routes), [routes]);
  return <RouterConfigContext.Provider value={value}>{children}</RouterConfigContext.Provider>;
}
