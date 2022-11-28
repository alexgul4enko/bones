import { FC } from 'react';
import specTitle from 'cypress-sonarqube-reporter/specTitle';
import {
  usePrefetchRequest,
  useSearch,
  makeCancelablePromise,
  ResourcesProvider
} from '../../../packages/resource/lib';

interface DataType {
  name: string;
  email: string;
}

function requestFunction(api: any, params) {
  return api.get('/users/:name', { params });
}

export const Request: FC = () => {
  const { data, request } = usePrefetchRequest<DataType>(requestFunction, 'prefetchRequest', {
    filters: { name: 'initial' }
  });
  const search = useSearch(request);
  return (
    <div>
      <input
        data-testid='requst-search'
        onChange={(e) => {
          search({ name: e.target.value });
        }}
      />
      <p data-testid='requst-data'>
        name:{data?.name};email:{data?.email}
      </p>
      <button
        data-testid='custom-request'
        onClick={() => {
          request({ name: 'New_user' });
        }}
      >
        request
      </button>
    </div>
  );
};

describe(specTitle('usePrefetchRequest'), () => {
  it('should work properly', () => {
    cy.intercept('GET', '/users/*', (req) => {
      const url = new URL(req.url);

      const _name = url.pathname.split('/').pop();
      req.reply({
        body: {
          name: _name,
          email: `${_name}@example.com`
        }
      });
    });
    cy.mount(
      <ResourcesProvider>
        <Request />
      </ResourcesProvider>
    );

    cy.get('[data-testid=requst-data]').should('contain', 'name:initial;email:initial@example.com');

    cy.get('[data-testid=custom-request]').click();
    cy.get('[data-testid=requst-data]').should('contain', 'name:New_user;email:New_user@example.com');

    cy.get('[data-testid=requst-search]').type('Alex');
    cy.get('[data-testid=requst-data]').should('contain', 'name:Alex;email:Alex@example.com');
  });
});
