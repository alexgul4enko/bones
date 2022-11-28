import { getNameSpaceFromResource } from './get-namespace-from-resource';
import { makeResourceActions } from './make-actions';
import { Reducers } from '../types';
import { Dispatch } from 'redux';

type Resource =
  | {
      endpoint?: string;
      namespace: string;
      reducer?: Reducers;
      queries?: string[];
    }
  | string;

export function mapDispatchToProps(resources: Resource | Resource[], dispatch: Dispatch) {
  const res = Array.isArray(resources) ? resources : [resources];
  return res.reduce(
    (res, resource) => ({
      ...res,
      [getNameSpaceFromResource(resource)]: makeResourceActions(resource, dispatch)
    }),
    {}
  );
}
