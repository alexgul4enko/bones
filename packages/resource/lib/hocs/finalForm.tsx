import { Component, ComponentType } from 'react';
import { Form, FormProps } from 'react-final-form';
import { FORM_ERROR, FormApi } from 'final-form';
import omit from 'lodash/omit';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { isFormValid, getData, getIdKey, ValuesInterceptorType } from './utils';

export type FormConfigs = Omit<FormProps, 'validate' | 'initialValues' | 'onSubmit'> & {
  validate?: (values: Record<string, any>, props: Record<string, any>) => Record<string, any> | undefined;
  onSubmitSuccess?: (response: Record<string, any>, props: Record<string, any>) => void;
  onSubmitFailed?: (erros: any, props: Record<string, any>) => void;
  valuesInterceptor?: ValuesInterceptorType;
  initialValues?: Record<string, any> | ((props: Record<string, any>) => Record<string, any> | undefined);
  onSubmit?: (data: any, form: FormApi, props: Record<string, any>) => Promise<any>;
};

interface FormResourceConfig {
  key: string;
  resource?: {
    endpoint: string;
  };
}

/*
 * HOC to wrap React Compoent with react-final form Provider
 * This HOC will be internally used in with-final-form HOC
 * Spec:
 * Initial values:
 * 1. ability to parse props to initial values using initialValues config as a function
 * 2. use statis initial values if initialValues config is an object
 * 3. automatically get initial values from rresource
 * Submit:
 * 1. Deetect which Request to send POST or PATCH based on REST API
 * 2. call a callback function on submit success
 * 3. convert api responce to form object to automatically bass field and non-field errors
 * isFormValid:
 * custom boolean flag to determinate all posibble wariants of form state
 */
export function finalForm(
  { validate = () => undefined, onSubmitSuccess, onSubmitFailed, valuesInterceptor, ...configs }: FormConfigs,
  config: FormResourceConfig
) {
  const key = get(config, 'key');
  if (!key && !configs.onSubmit) {
    throw new Error('OnSubmit is required');
  }
  return function HOC(ChildComponent: ComponentType<any>) {
    return class FinalFormHOC extends Component<Record<string, any>> {
      initialValues: Record<string, any> | undefined;
      constructor(props: Record<string, any>) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.initialValues = this.getInitialValues(props);
      }

      getInitialValues(props: Record<string, any>) {
        if (configs.initialValues) {
          if (typeof configs.initialValues === 'function') {
            return configs.initialValues(props);
          }
          return configs.initialValues;
        }
        return props.initialValues || (key && get(props[key], 'data'));
      }

      handleSubmit(values: Record<string, any>, form: FormApi) {
        const registeredFields = form.getRegisteredFields();
        const idKey = getIdKey(this.props, config);
        const apiData = {
          ...getData(values, this.props, form, valuesInterceptor),
          ...(typeof idKey === 'object' ? idKey : {})
        };
        const submitAction = get(this.props[key], 'request')
          ? get(this.props[key], 'request')
          : isEmpty(idKey)
          ? get(this.props[key], 'create')
          : get(this.props[key], 'update');
        return Promise.resolve(
          configs.onSubmit
            ? configs.onSubmit(apiData, form, this.props)
            : submitAction(apiData, { forceUpdates: true, method: isEmpty(idKey) ? 'POST' : 'PUT' })
        )
          .then((data) => {
            if (typeof onSubmitSuccess === 'function') {
              onSubmitSuccess(data, this.props);
            }
          })
          .catch((error) => {
            const errors = Object.entries(error || {}).reduce(function (res, [key, value]) {
              let eKey = key;
              if (!registeredFields.includes(key)) {
                eKey = '_error';
              }
              return {
                ...res,
                [eKey]: value
              };
            }, {});
            if (typeof onSubmitFailed === 'function') {
              try {
                onSubmitFailed(errors, this.props);
              } catch (e) {}
            }
            if (get(errors, '_error')) {
              return {
                [FORM_ERROR]: get(errors, '_error'),
                ...omit(errors, '_error')
              };
            }
            return errors;
          });
      }

      handleValidate(values: Record<string, any>) {
        return validate(values, this.props);
      }

      render() {
        return (
          <Form
            {...configs}
            onSubmit={this.handleSubmit}
            validate={this.handleValidate}
            initialValues={this.initialValues}
            render={(formProps) => <ChildComponent {...formProps} {...this.props} valid={isFormValid(formProps)} />}
          />
        );
      }
    };
  };
}
