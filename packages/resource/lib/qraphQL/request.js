import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export default function request(API, variables, { query, parseValue, signal, parseErrors }) {
  const query_ = typeof query === 'string' ? query : get(query, 'loc.source.body');
  return API.post(
    '/graphql',
    {
      query: query_,
      variables
    },
    { signal }
  ).then((data) => {
    return valueInteceptor(data, parseValue, parseErrors);
  });
}

function valueInteceptor(value, parseValue, parseErrors) {
  if (typeof parseErrors === 'string') {
    const errors = get(value, parseErrors);
    if (Array.isArray(errors) && !isEmpty(errors)) {
      return Promise.reject(errors.map(({ message }) => message));
    }
  }
  if (typeof parseErrors === 'function') {
    const errors = parseErrors(value);
    if (!isEmpty(errors)) {
      return Promise.reject(errors);
    }
  }
  if (typeof parseValue === 'string') {
    return get(value, parseValue);
  }
  if (typeof parseValue === 'function') {
    return parseValue(value);
  }
  return value;
}
