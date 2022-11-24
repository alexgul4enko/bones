import { useMemo } from 'react';
import omit from 'lodash/omit';
import get from 'lodash/get';

export default function getConfigs(query, configs) {
  return useMemo(() => {
    if (typeof configs === 'string') {
      return { namespace: configs, query };
    }
    const namespace = configs.namespace || get(query, 'definitions[0].name.value');
    const queries = get(query, 'definitions[0].variableDefinitions', []).map((variable) =>
      get(variable, 'variable.name.value')
    );
    return {
      queries,
      query,
      ...omit(configs, 'destroyOnUnmount'),
      namespace
    };
  }, [configs, query]);
}
