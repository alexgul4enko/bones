import { Router } from 'react-router';
import PropTypes from 'prop-types';
import RecursiveRoute, { RouterConfig as Config } from './recursiveRoute';
import RouterConfig from './routerConfig';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

AppRouter.propTypes = {
  routes: PropTypes.array.isRequired,
  history: PropTypes.object,
  notFountUrl: PropTypes.string.isRequired
};

AppRouter.defaultProps = {
  history
};

export default function AppRouter({ routes, history, notFountUrl, configs }) {
  return (
    <Router history={history}>
      <RouterConfig routes={routes}>
        <RecursiveRoute
          routes={routes}
          notFountUrl={notFountUrl}
          interceptors={configs instanceof Config ? configs.getInterceptors() : undefined}
        />
      </RouterConfig>
    </Router>
  );
}
