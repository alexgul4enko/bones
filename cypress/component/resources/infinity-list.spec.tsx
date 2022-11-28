import { FC, useCallback } from 'react';
import specTitle from 'cypress-sonarqube-reporter/specTitle';
import Qs from 'query-string';
import { withInfinityList, InifinyProps, ResourceType, ResourcesProvider } from '../../../packages/resource/lib';

interface User {
  name: string;
  uuid: number;
}

interface Users {
  count?: number;
  results?: User[];
}

interface UserProps extends InifinyProps {
  usersList: ResourceType<Users>;
}

const MyElement: FC<UserProps> = ({ usersList, onSearch, loadNext, onRefresh }) => {
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    onSearch({ search: value });
  }, []);
  return (
    <div>
      <input type='text' onChange={handleChange} data-testid='search' />
      <button data-testid='reset' onClick={onRefresh}>
        reset
      </button>
      <p>{JSON.stringify(usersList.filters)}</p>
      <ul data-testid='users-list'>
        {usersList.data?.results?.map((user) => (
          <li key={user.uuid} data-testid='user-item'>
            {user.name}
          </li>
        ))}
      </ul>
      <button onClick={() => loadNext()} data-testid='load-next'>
        load next
      </button>
    </div>
  );
};

export const UsersList = withInfinityList(
  {
    namespace: 'usersList',
    endpoint: '/users',
    queries: ['search', 'offset', 'limit']
  },
  {
    defaultParams: {
      offset: 0,
      limit: 5
    }
  }
)(MyElement);

describe(specTitle('infinityList'), () => {
  it('should work properly', () => {
    const users = [
      { name: 'Alex', uuid: '123' },
      { name: 'Denis', uuid: '321' },
      { name: 'Helen', uuid: '345' },
      { name: 'Petro', uuid: '543' },
      { name: 'Nika', uuid: '567' },
      { name: 'Taras', uuid: '756' },
      { name: 'Masha', uuid: '678' },
      { name: 'Pasha', uuid: '866' },
      { name: 'Dasha', uuid: '666' },
      { name: 'Anna', uuid: '999' }
    ];
    cy.intercept('GET', '/users*', (req) => {
      interface Params {
        offset: string;
        limit: string;
        search: string;
      }
      const url = new URL(req.url);

      const params: Params = Qs.parse(url.search) as any;
      if (params.search) {
        const res = users.filter((item) => {
          return item.name.toLowerCase().includes(params.search.toLowerCase());
        });
        req.reply({
          body: {
            count: res.length,
            results: res
          }
        });
      } else {
        req.reply({
          body: {
            count: 10,
            results: users.slice(parseInt(params.offset, 10), parseInt(params.limit, 10) + parseInt(params.offset, 10))
          }
        });
      }
    }).as('users');
    cy.mount(
      <ResourcesProvider>
        <UsersList />
      </ResourcesProvider>
    );

    cy.get('[data-testid=users-list] li').should('have.length', 5);
    cy.get('[data-testid=users-list] li').should((items) => {
      expect(items[0]).to.contain.text('Alex');
      expect(items[1]).to.contain.text('Denis');
      expect(items[2]).to.contain.text('Helen');
      expect(items[3]).to.contain.text('Petro');
      expect(items[4]).to.contain.text('Nika');
    });
    cy.get('[data-testid=load-next]').click();
    cy.wait(['@users']);
    cy.get('[data-testid=users-list] li').should('have.length', 10);
    cy.get('[data-testid=users-list] li').should((items) => {
      expect(items[0]).to.contain.text('Alex');
      expect(items[1]).to.contain.text('Denis');
      expect(items[2]).to.contain.text('Helen');
      expect(items[3]).to.contain.text('Petro');
      expect(items[4]).to.contain.text('Nika');

      expect(items[5]).to.contain.text('Taras');
      expect(items[6]).to.contain.text('Masha');
      expect(items[7]).to.contain.text('Pasha');
      expect(items[8]).to.contain.text('Dasha');
      expect(items[9]).to.contain.text('Anna');
    });
    cy.get('[data-testid=load-next]').click();
    cy.wait(100);
    cy.get('[data-testid=users-list] li').should('have.length', 10);
    cy.get('[data-testid=reset]').click();
    cy.wait(['@users']);
    cy.get('[data-testid=users-list] li').should('have.length', 5);
    cy.get('[data-testid=users-list] li').should((items) => {
      expect(items[0]).to.contain.text('Alex');
      expect(items[1]).to.contain.text('Denis');
      expect(items[2]).to.contain.text('Helen');
      expect(items[3]).to.contain.text('Petro');
      expect(items[4]).to.contain.text('Nika');
    });
    cy.get('[data-testid=search]').type('asha');
    cy.wait(['@users']);
    cy.get('[data-testid=users-list] li').should('have.length', 3);
    cy.get('[data-testid=users-list] li').should((items) => {
      expect(items[0]).to.contain.text('Masha');
      expect(items[1]).to.contain.text('Pasha');
      expect(items[2]).to.contain.text('Dasha');
    });
    cy.get('[data-testid=load-next]').click();
    cy.wait(100);
    cy.get('[data-testid=users-list] li').should('have.length', 3);
  });
});
