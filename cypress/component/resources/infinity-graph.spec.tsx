import { FC } from 'react';
import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { useQuery, usePrefetchQuery, ResourcesProvider, useGraphInifnyList } from '../../../packages/resource/lib';
import { API } from '../../../packages/api/lib';
import gql from 'graphql-tag';

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

type Dog = {
  node: {
    id: number;
  };
};

type Data = {
  edges?: Dog[];
};

const InfinityQueryComponent: FC = () => {
  const resource = usePrefetchQuery<Data>(infinityquery, { transformValue: 'data.dogs' })({ name: 'Muchyk' });
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(resource);
  const { data, filters, request } = resource;

  const items = Array.isArray(data?.edges)
    ? data.edges.map((item) => {
        return (
          <p key={item.node.id} data-testid='dog-item'>
            {item.node.id}
          </p>
        );
      })
    : null;
  return (
    <>
      <p data-testid='filters'>{JSON.stringify(filters)}</p>
      <p data-testid='refreshing'>{JSON.stringify(isRefreshing)}</p>
      <div data-testid='dogs-list'>{items}</div>
      <button
        data-testid='load-next'
        onClick={() => {
          loadNext();
        }}
      >
        fetch next
      </button>
      <button
        data-testid='refresh'
        onClick={() => {
          refresh();
        }}
      >
        refresh
      </button>
    </>
  );
};

const InfinityQueryCustom: FC = () => {
  const resource = usePrefetchQuery<Data>(infinityquery, { transformValue: 'data.dogs' })({ name: 'Muchyk' });
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(resource, {
    hasNext: (data: any) => data?.pageInfo?.hasNextPage,
    cursorKey: 'cursor',
    getNextFilters: (data: any) => data?.pageInfo?.endCursor,
    concatFn: (prev: any, next: any) => ({
      ...prev,
      ...next,
      edges: [...(prev?.edges || []), ...(next?.edges || [])]
    })
  });
  const { data, filters, request } = resource;

  const items = Array.isArray(data?.edges)
    ? data.edges.map((item) => {
        return (
          <p key={item.node.id} data-testid='dog-item'>
            {item.node.id}
          </p>
        );
      })
    : null;
  return (
    <>
      <p data-testid='filters'>{JSON.stringify(filters)}</p>
      <p data-testid='refreshing'>{JSON.stringify(isRefreshing)}</p>
      <div data-testid='dogs-list'>{items}</div>
      <button
        data-testid='load-next'
        onClick={() => {
          loadNext();
        }}
      >
        fetch next
      </button>
      <button
        data-testid='refresh'
        onClick={() => {
          refresh();
        }}
      >
        refresh
      </button>
    </>
  );
};

let countreq = 0;
describe(specTitle('graphql-loaders'), () => {
  it('inifinitylist', () => {
    cy.intercept('POST', '/graphql', (req) => {
      const page = req?.body?.variables?.cursor || 0;
      if (!page) {
        countreq += 1;
      }
      req.reply({
        delay: !page && countreq ? 1000 : 200,
        statusCode: 200,
        body: {
          data: {
            dogs: {
              pageInfo: {
                hasNextPage: true,
                endCursor: page + 10
              },
              edges: [
                { node: { id: page + 1 } },
                { node: { id: page + 2 } },
                { node: { id: page + 3 } },
                { node: { id: page + 4 } }
              ]
            }
          }
        }
      });
    }).as('graphql');
    cy.mount(
      <ResourcesProvider api={api}>
        <InfinityQueryComponent />
      </ResourcesProvider>
    );
    cy.get('[data-testid=filters]').should('contain', '{"name":"Muchyk"}');
    cy.get('[data-testid=dogs-list] > p').should('have.length', 4);
    cy.get('[data-testid=load-next]').click();
    cy.get('[data-testid=dogs-list] > p').should('have.length', 8);
    cy.get('[data-testid=load-next]').click();
    cy.get('[data-testid=load-next]').click();
    cy.get('[data-testid=load-next]').click();
    cy.get('[data-testid=dogs-list] > p').should('have.length', 12);
    cy.get('[data-testid=refresh]').click();
    cy.get('[data-testid=refreshing]').should('contain', 'true');
    cy.wait('@graphql');
    cy.get('[data-testid=dogs-list] > p').should('have.length', 4);
  });
  it('inifinitylist with custom config', () => {
    cy.intercept('POST', '/graphql', (req) => {
      const page = req?.body?.variables?.cursor || 0;
      if (!page) {
        countreq += 1;
      }
      req.reply({
        delay: !page && countreq ? 1000 : 200,
        statusCode: 200,
        body: {
          data: {
            dogs: {
              pageInfo: {
                hasNextPage: true,
                endCursor: page + 10
              },
              edges: [
                { node: { id: page + 1 } },
                { node: { id: page + 2 } },
                { node: { id: page + 3 } },
                { node: { id: page + 4 } }
              ]
            }
          }
        }
      });
    }).as('graphql');
    cy.mount(
      <ResourcesProvider api={api}>
        <InfinityQueryCustom />
      </ResourcesProvider>
    );
    cy.get('[data-testid=filters]').should('contain', '{"name":"Muchyk"}');
    cy.get('[data-testid=dogs-list] > p').should('have.length', 4);
    cy.get('[data-testid=load-next]').click();
    cy.get('[data-testid=dogs-list] > p').should('have.length', 8);
    cy.get('[data-testid=load-next]').click();
    cy.get('[data-testid=load-next]').click();
    cy.get('[data-testid=load-next]').click();
    cy.get('[data-testid=dogs-list] > p').should('have.length', 12);
    cy.get('[data-testid=refresh]').click();
    cy.get('[data-testid=refreshing]').should('contain', 'true');
    cy.wait('@graphql');
    cy.get('[data-testid=dogs-list] > p').should('have.length', 4);
  });
});
