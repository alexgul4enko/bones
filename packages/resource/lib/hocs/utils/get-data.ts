import { FormApi } from 'final-form';

export type ValuesInterceptorType = (
  values: Record<string, any>,
  props: Record<string, any>,
  form: FormApi
) => Record<string, any>;

export function getData(
  values: Record<string, any>,
  props: Record<string, any>,
  form: FormApi,
  valuesInterceptor?: ValuesInterceptorType
) {
  if (typeof valuesInterceptor === 'function') {
    return valuesInterceptor(values, props, form);
  }
  return values;
}
