import { FC } from 'react';
import specTitle from 'cypress-sonarqube-reporter/specTitle';
import {
  useSetData,
  useSetErrors,
  useSetFilters,
  useSetLoading,
  useClear,
  useResource,
  useResourceData,
  ResourcesProvider
} from '../../../packages/resource/lib';

interface DataType {
  name: string;
  age: number;
}

export const SipmleHooks: FC = () => {
  const { data, errors, isLoading, filters } = useResource<DataType>('hooks');
  const hooksData = useResourceData<DataType>('hooks');
  const setData = useSetData('hooks');
  const setFilters = useSetFilters('hooks');
  const setLoading = useSetLoading('hooks');
  const setErrors = useSetErrors('hooks');
  const clear = useClear('hooks');
  return (
    <div>
      <p data-testid='data'>
        name:{data?.name};age{data?.age}
      </p>
      <p data-testid='use-data'>
        name:{hooksData.data?.name};age{hooksData.data?.age}
      </p>
      <p data-testid='isLoading'>isLoading: {isLoading ? 'Loading...' : 'not loading'}</p>
      <p data-testid='filters'>filters: {filters ? JSON.stringify(filters) : null}</p>
      <p data-testid='errors'>errors: {errors ? JSON.stringify(errors) : null}</p>
      <button
        data-testid='data-button'
        onClick={() => {
          setData({ name: 'Alex', age: 12 });
        }}
      >
        setData
      </button>
      <button
        data-testid='filters-button'
        onClick={() => {
          setFilters({ offset: 10, limit: 20 });
        }}
      >
        setFilters
      </button>
      <button
        data-testid='isLoading-button'
        onClick={() => {
          setLoading(true);
        }}
      >
        setLoading
      </button>
      <button
        data-testid='errors-button'
        onClick={() => {
          setErrors({ error: 'Error' });
        }}
      >
        setErrors
      </button>
      <button
        data-testid='clear-button'
        onClick={() => {
          clear();
        }}
      >
        clear
      </button>
    </div>
  );
};

describe(specTitle('sipmle-hooks.cy'), () => {
  it('should work properly', () => {
    cy.mount(
      <ResourcesProvider>
        <SipmleHooks />
      </ResourcesProvider>
    );

    cy.get('[data-testid=data]').should('contain', 'name:;age');
    cy.get('[data-testid=isLoading]').should('contain', 'isLoading: not loading');
    cy.get('[data-testid=filters]').should('contain', 'filters:');
    cy.get('[data-testid=errors]').should('contain', 'errors:');

    cy.get('[data-testid=data-button]').click();
    cy.get('[data-testid=data]').should('contain', 'name:Alex;age12');
    cy.get('[data-testid=use-data]').should('contain', 'name:Alex;age12');
    cy.get('[data-testid=filters-button]').click();
    cy.get('[data-testid=filters]').should('contain', 'filters: {"offset":10,"limit":20}');

    cy.get('[data-testid=isLoading-button]').click();
    cy.get('[data-testid=isLoading]').should('contain', 'isLoading: Loading...');

    cy.get('[data-testid=errors-button]').click();
    cy.get('[data-testid=errors]').should('contain', 'errors: {"error":"Error"}');

    cy.get('[data-testid=clear-button]').click();
    cy.get('[data-testid=data]').should('contain', 'name:;age');
    cy.get('[data-testid=isLoading]').should('contain', 'isLoading: not loading');
    cy.get('[data-testid=filters]').should('contain', 'filters:');
    cy.get('[data-testid=errors]').should('contain', 'errors:');
  });
});
