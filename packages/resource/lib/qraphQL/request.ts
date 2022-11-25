import { API } from '../types';
import get from 'lodash/get';
import { compile } from 'path-to-regexp';
import isEmpty from 'lodash/isEmpty';
import { DocumentNode } from 'graphql';

type ParseFunctionType = string | ((value: Record<string, any>) => Record<string, any>);
interface Meta {
  query: DocumentNode;
  transformValue?: ParseFunctionType;
  transformErrors?: ParseFunctionType;
  endpoint?: string;
  baseURL?: string;
}

export function request(
  api: API,
  variables: Record<string, any>,
  { query, transformValue, transformErrors, endpoint, baseURL }: Meta
) {
  let _endpoint: string = endpoint || '/graphql';
  if (/\/:/.test(_endpoint) && variables && !isEmpty(variables)) {
    _endpoint = compile(_endpoint)(variables);
  }
  return api
    .post(
      _endpoint,
      {
        query: query?.loc?.source.body,
        variables
      },
      { baseURL }
    )
    .then((data) => {
      return valueInteceptor(data, transformValue, transformErrors);
    });
}

function valueInteceptor(value: Record<string, any>, parseValue?: ParseFunctionType, parseErrors?: ParseFunctionType) {
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
