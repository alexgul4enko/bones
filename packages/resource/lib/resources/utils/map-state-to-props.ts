import { getNameSpaceFromResource } from './get-namespace-from-resource';
import get from 'lodash/get';
type Resource =
  | {
      namespace: string;
    }
  | string;

export function mapStateToProps(resources: Resource | Resource[]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (state: Record<string, any>, props: Record<string, any>) {
    const res = Array.isArray(resources) ? resources : [resources];
    return res.reduce((res, resource) => {
      const key = getNameSpaceFromResource(resource);
      return {
        ...res,
        [key]: get(state, key, {})
      };
    }, {});
  };
}
