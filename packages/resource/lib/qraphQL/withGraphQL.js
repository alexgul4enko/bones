import { connect } from 'react-redux';
import { makeRequest } from '../resources';
import request from './request';
import camelCase from 'lodash/camelCase';
import get from 'lodash/get';

function getNamespace(query, configs) {
  if (typeof configs === 'string') {
    return camelCase(configs);
  }
  if (get(configs, 'namespace')) {
    return camelCase(configs.namespace);
  }
  if (typeof query === 'string') {
    throw new Error('Please use babel-plugin-import-graphql to convert query');
  }
  return camelCase(get(query, 'definitions[0].name.value'));
}

export default function withGraphQL(query, configs) {
  if (typeof query === 'string') {
    throw new Error('You can use babel-plugin-import-graphql to convert query');
  }
  const namespace = getNamespace(query, configs);
  const meta = {
    query,
    ...(typeof configs === 'object' && Boolean(configs) ? configs : {}),
    namespace
  };

  const customeResourceConnectHOC = connect(
    (state) => ({ [namespace]: get(state, namespace) }),
    (dispatch) => ({
      [namespace]: {
        request: function (payload, actionmeta) {
          return dispatch(makeRequest(request)(payload, { ...meta, ...configs, ...actionmeta }));
        }
      }
    }),
    (stateProps, dispatchProps, ownProps) => {
      return {
        ...ownProps,
        [namespace]: {
          ...get(stateProps, namespace, {}),
          ...get(dispatchProps, namespace, {})
        }
      };
    }
  );
  customeResourceConnectHOC.namespace = namespace;
  return customeResourceConnectHOC;
}
