import { FC } from 'react';
import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { usePrefetchResource, ResourcesProvider } from '../../../packages/resource/lib';

const config = {
  namespace: 'prefetchResource',
  endpoint: '/user/alex'
};
export const Resource: FC<any> = () => {
  const { data, isLoading, create, errors } = usePrefetchResource<Record<string, string>>(config);
  if (isLoading) {
    return <p data-testid='resource-data'>isLoading</p>;
  }
  if (errors) {
    return <p data-testid='resource-data'>{JSON.stringify(errors)}</p>;
  }
  return (
    <>
      <p data-testid='resource-data'>{JSON.stringify(data)}</p>
      <button data-testid='resource-post' onClick={() => create()}>
        create
      </button>
    </>
  );
};

describe(specTitle('usePrefetchResource'), () => {
  it('should work properly', () => {
    cy.intercept('GET', '/user/alex', {
      fixture: 'example.json'
    }).as('request');
    cy.intercept('POST', '/user/alex', (req) => {
      req.reply({
        statusCode: 501,
        delay: 1000,
        body: {
          name: 'Peter Pan'
        }
      });
    }).as('create');

    cy.mount(
      <ResourcesProvider>
        <Resource />
      </ResourcesProvider>
    );

    cy.get('[data-testid=resource-data]').should('contain', 'isLoading');
    cy.wait('@request');
    cy.get('[data-testid=resource-data]').should(
      'contain',
      '{"name":"Using fixtures to represent data","email":"hello@cypress.io","body":"Fixtures are a great way to mock data for responses to routes"}'
    );

    cy.get('[data-testid=resource-post]').click();
    cy.get('[data-testid=resource-data]').should('contain', 'isLoading');
    cy.wait('@create');

    cy.get('[data-testid=resource-data]').should('contain', '{"name":"Peter Pan"}');
  });
});
