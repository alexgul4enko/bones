import { FC } from 'react';
import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { useQuery, usePrefetchQuery, ResourcesProvider } from '../../../packages/resource/lib';
import { API } from '../../../packages/api/lib';
import gql from 'graphql-tag';

const query = gql`
  query Dogs($name: String) {
    dogs {
      id
      breed
    }
  }
`;

const infinityquery = gql`
  query Dogs($name: String, $cursor: String) {
    dogs {
      id
      breed
    }
  }
`;

const api = new API({
  baseURL: '/graphql'
});

const MyQueryComponent: FC = () => {
  const { request, data, isLoading, errors, filters } = useQuery(query);

  return (
    <>
      <p data-testid='data'>{JSON.stringify(data)}</p>
      <p data-testid='isLoading'>{JSON.stringify(isLoading)}</p>
      <p data-testid='errors'>{JSON.stringify(errors)}</p>
      <p data-testid='filters'>{JSON.stringify(filters)}</p>
      <button
        data-testid='fetch'
        onClick={() => {
          request({ name: 'Barsik' });
        }}
      >
        fetch
      </button>
    </>
  );
};

const MyPrefetchQueryComponent: FC = () => {
  const { request, data, isLoading, errors, filters } = usePrefetchQuery(query)({ name: 'Muchyk' });

  return (
    <>
      <p data-testid='data'>{JSON.stringify(data)}</p>
      <p data-testid='isLoading'>{JSON.stringify(isLoading)}</p>
      <p data-testid='errors'>{JSON.stringify(errors)}</p>
      <p data-testid='filters'>{JSON.stringify(filters)}</p>
      <button
        data-testid='fetch'
        onClick={() => {
          request({ name: 'Barsik' });
        }}
      >
        fetch
      </button>
    </>
  );
};

let countreq = 0;
describe(specTitle('graphql'), () => {
  it('useQuery', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (!countreq) {
        countreq += 1;
        req.reply({
          delay: 500,
          statusCode: 200,
          body: {
            hello: 'graphql'
          }
        });
      } else {
        req.reply({
          statusCode: 500,
          body: {
            'by-by': 'graphql'
          }
        });
      }
    }).as('graphql');
    cy.mount(
      <ResourcesProvider api={api}>
        <MyQueryComponent />
      </ResourcesProvider>
    );
    cy.get('[data-testid=data]').should('contain', 'null');
    cy.get('[data-testid=isLoading]').should('contain', 'false');
    cy.get('[data-testid=errors]').should('contain', 'null');
    cy.get('[data-testid=filters]').should('contain', 'null');
    cy.get('[data-testid=fetch]').click();
    cy.get('[data-testid=isLoading]').should('contain', 'true');
    cy.wait('@graphql');
    cy.get('[data-testid=data]').should('contain', '{"hello":"graphql"}');
    cy.get('[data-testid=isLoading]').should('contain', 'false');
    cy.get('[data-testid=errors]').should('contain', 'null');
    cy.get('[data-testid=filters]').should('contain', '{"name":"Barsik"}');
    cy.get('[data-testid=fetch]').click();
    cy.get('[data-testid=data]').should('contain', 'null');
    cy.get('[data-testid=isLoading]').should('contain', 'false');
    cy.get('[data-testid=errors]').should('contain', '{"by-by":"graphql"}');
    cy.get('[data-testid=filters]').should('contain', '{"name":"Barsik"}');
  });
  it('usePrefetchQuery', () => {
    cy.intercept('POST', '/graphql', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          hello: 'graphql'
        }
      });
    }).as('graphql');
    cy.mount(
      <ResourcesProvider api={api}>
        <MyPrefetchQueryComponent />
      </ResourcesProvider>
    );
    cy.get('[data-testid=data]').should('contain', '{"hello":"graphql"}');
    cy.get('[data-testid=isLoading]').should('contain', 'false');
    cy.get('[data-testid=errors]').should('contain', 'null');
    cy.get('[data-testid=filters]').should('contain', '{"name":"Muchyk"}');
  });
});
