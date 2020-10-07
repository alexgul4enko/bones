import { Component } from 'react'
import { Form } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { parse } from 'path-to-regexp'
import omit from 'lodash/omit'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { parseIdKey } from '../utils'


export default function withFinalForm({
  validate = () => {},
  onSubmitSuccess,
  onSubmitFailed,
  valuesInterceptor,
  ...configs
}, config) {
  const key = get(config, 'key')
  if(!key && !configs.onSubmit) {
    throw new Error('OnSubmit is required')
  }
  return function HOC(ChildComponent) {
    return class FinalFormHOC extends Component {
      constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleValidate = this.handleValidate.bind(this)
        this.initialValues = this.getInitialValues(props)
      }

      getInitialValues(props) {
        if(configs.initialValues) {
          if(typeof configs.initialValues === 'function') {
            return configs.initialValues(props)
          }
          return configs.initialValues
        }
        return props.initialValues || get(props[key], 'data')
      }

      handleSubmit(values, form) {
        const registeredFields = form.getRegisteredFields()
        const idKey = getIdKey(this.props, config)
        const apiData = { ...getData(values, this.props, form, valuesInterceptor), ...(idKey || {}) }
        const submitAction = get(this.props[key], 'customRequest')
          ? get(this.props[key], 'customRequest')
          : isEmpty(idKey) ? get(this.props[key], 'create') : get(this.props[key], 'update')
        return Promise.resolve(configs.onSubmit ? configs.onSubmit(apiData, form, this.props) : submitAction(apiData, { forceUpdates: true }))
          .then(data => {
            if(typeof onSubmitSuccess === 'function') {
              onSubmitSuccess(data, this.props)
            }
          })
          .catch(error => {
            const errors = Object.entries(error || {}).reduce(function(res, [key, value]) {
              let eKey = key
              if(!registeredFields.includes(key)) { eKey = '_error' }
              return {
                ...res,
                [eKey]: value,
              }
            }, {})
            if(typeof onSubmitFailed === 'function') {
              try {
                onSubmitFailed(errors, this.props)
              } catch (e) {}
            }
            if(errors._error) {
              return {
                [FORM_ERROR]: errors._error,
                ...omit(errors, '_error'),
              }
            }
            return errors
          })
      }

      handleValidate(values) {
        return validate(values, this.props)
      }

      render() {
        return (
          <Form
            {...configs}
            onSubmit={this.handleSubmit}
            validate={this.handleValidate}
            initialValues={this.initialValues}
            render={formProps => (
              <ChildComponent
                {...formProps}
                {...this.props}
                valid={isFormValid(formProps) }
              />
            )}
          />
        )
      }
    }
  }
}

function getData(values, props, form, valuesInterceptor) {
  if(typeof valuesInterceptor === 'function') {
    return valuesInterceptor(values, props, form)
  }
  return values
}

function isFormValid(form = {}) {
  if(!form.dirty) {
    return false
  }
  if(form.hasValidationErrors) {
    return false
  }
  if(form.hasSubmitErrors && !form.dirtySinceLastSubmit) {
    return false
  }
  return true
}


function getIdKey(props, { key, resource, configs } = {}) {
  if(!key) {
    return false
  }
  let idKey = parseIdKey(resource.endpoint)
  if(!idKey) {
    return false
  }
  if(get(props, idKey)) {
    return { [idKey]: get(props, idKey) }
  }
  if(get(props[key], `data[${idKey}]`)) {
    return { [idKey]: get(props[key], `data[${idKey}]`) }
  }
  if(!get(configs, 'useQueries')) {
    return false
  }
  const queryData = get(props, 'location.search') ? configs.parseQueryParams(get(props, 'location.search')) : {}
  const navigationParams = get(props, 'match.params', get(props, 'navigation.state.params', {}))
  if(get(queryData, idKey)) {
    return { [idKey]: get(queryData, idKey) }
  }
  if(get(navigationParams, idKey)) {
    return { [idKey]: get(navigationParams, idKey) }
  }
  return false
}
