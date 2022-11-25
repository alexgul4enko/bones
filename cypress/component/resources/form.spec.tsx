import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { ComponentType, useMemo, FC } from 'react';
import { Field, FieldRenderProps, FieldProps, FormRenderProps } from 'react-final-form';
import get from 'lodash/get';
import set from 'lodash/set';
import { withFinalForm, ResourcesProvider } from '../../../packages/resource/lib';

function BaseFieldHOC(Component: ComponentType<FieldRenderProps<string, any>>) {
  return function (props: FieldProps<string, any, any>) {
    return <Field component={Component} parse={identity} {...props} />;
  };
}

function identity(value: any) {
  return value;
}

const Input: FC<FieldRenderProps<string, any>> = ({ meta, input, ...props }) => {
  const error = useMemo(() => {
    if (meta.submitError && !meta.dirtySinceLastSubmit) {
      return meta.submitError;
    }
    if (meta.error && meta.touched) {
      return meta.error;
    }
  }, [meta.error, meta.touched, meta.dirtySinceLastSubmit, meta.submitError]);
  return (
    <div>
      <input {...props} {...input} />
      {error ? <p data-testid={`erros-${input.name}`}>{error}</p> : null}
    </div>
  );
};

export const InputField = BaseFieldHOC(Input);

function validate(values: Record<string, any>) {
  const errors: Record<string, string> = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    set(errors, 'password', 'Required');
  }
  if (values.email && values.email !== 'test@test.com') {
    errors.email = 'email is invalid';
  }

  return errors;
}

const Form: FC<FormRenderProps & { age: string; uuid: string }> = ({ handleSubmit, submitting, valid, age, uuid }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login form</h2>
      <p data-testid='query-params'>
        age:{age};uuid:{uuid}
      </p>
      <InputField data-testid='email' name='email' type='email' placeholder='email' />
      <InputField data-testid='pass' name='password' type='test' placeholder='password' />
      <button data-testid='submit' disabled={submitting || !valid}>
        Login
      </button>
    </form>
  );
};

const FormComponent = withFinalForm<{ age: string; uuid: string }>(
  {
    validate,
    onSubmitFailed: () => alert('error'),
    onSubmitSuccess: (value) => value,
    valuesInterceptor: (value) => value,
    initialValues: (props) => ({
      email: (get(props, 'users.data.name') as string) + '@test'
    })
  },
  '/users/:uuid?',
  {}
)(Form);

describe(specTitle('form module'), () => {
  it('edit form', () => {
    cy.intercept('GET', '/users/test', {
      fixture: 'userdata.json'
    }).as('getUser');
    cy.intercept('PATCH', '/users/test', {
      fixture: 'userdata.json'
    }).as('updateUser');

    cy.mount(
      <ResourcesProvider>
        <FormComponent uuid='test' age='99' />
      </ResourcesProvider>
    );

    cy.get('[data-testid=query-params]').should('contain', 'age:99;uuid:test');
    cy.get('[data-testid=email]').should('have.value', 'some-user@test');
    cy.get('[data-testid=pass]').should('have.value', '');
    cy.get('[data-testid=submit]').should('be.disabled');
    cy.get('[data-testid=email]').clear();
    cy.get('[data-testid=email]').should('have.value', '');
    cy.get('[data-testid=email]').focus().blur();
    cy.get('[data-testid=erros-email]').should('contain', 'Required');
    cy.get('[data-testid=submit]').should('be.disabled');
    cy.get('[data-testid=email]').clear();
    cy.get('[data-testid=email]').type('test@gmail.com');
    cy.get('[data-testid=email]').focus().blur();
    cy.get('[data-testid=erros-email]').should('contain', 'email is invalid');
    cy.get('[data-testid=submit]').should('be.disabled');
    cy.get('[data-testid=email]').clear();
    cy.get('[data-testid=email]').type('test@test.com');
    cy.get('[data-testid=email]').focus().blur();
    cy.get('[data-testid=erros-email]').should('not.exist');
    cy.get('[data-testid=submit]').should('be.disabled');
    cy.get('[data-testid=pass]').focus().blur();
    cy.get('[data-testid=erros-password]').should('contain', 'Required');
    cy.get('[data-testid=submit]').should('be.disabled');
    cy.get('[data-testid=pass]').type('asdasdasd');
    cy.get('[data-testid=erros-password]').should('not.exist');
    cy.get('[data-testid=submit]').should('not.be.disabled');
    cy.get('[data-testid=submit]').click();
    cy.wait('@updateUser').its('request.body').should('deep.equal', {
      email: 'test@test.com',
      password: 'asdasdasd',
      uuid: 'test'
    });
  });
  it('create form', () => {
    cy.intercept('POST', '/users', {
      statusCode: 400,
      body: {
        email: 'this email was deleted',
        glob: 'global error'
      }
    }).as('createUser');
    cy.mount(
      <ResourcesProvider>
        <FormComponent />
      </ResourcesProvider>
    );

    cy.get('[data-testid=email]').clear();
    cy.get('[data-testid=email]').type('test@test.com');
    cy.get('[data-testid=pass]').type('asdasdasd');
    cy.get('[data-testid=submit]').click();
    cy.wait('@createUser');
    cy.get('[data-testid=erros-email]').should('contain', 'this email was deleted');
  });
});
