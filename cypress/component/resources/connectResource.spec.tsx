import { FC, useRef } from 'react';
import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { connectResources, ResourceType, ResourcesProvider } from '../../../packages/resource/lib';

interface User {
  name: string;
  age: number;
}

interface Users {
  count: number;
  results: User[];
}

interface UserErrors {
  error: string;
  data?: any;
}

interface UserFilters {
  offset: number;
  limit: number;
}

interface UserProps {
  users: ResourceType<User | Users, UserFilters, UserErrors>;
}

interface OwnPros {
  uuid: string;
}

const Resource: FC<UserProps & OwnPros> = ({ users, uuid }) => {
  const pendingPromise = useRef<any>(null);
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <p data-testid='data'>
            {(users.data as User)?.name}:{(users.data as User)?.age}
          </p>
          <p data-testid='loading'>{users.isLoading ? 'Loading' : 'not loading'}</p>
          <p data-testid='errors'>{users.errors?.error || 'no Errors'}</p>
          <p data-testid='filters'>
            offset:{users.filters?.offset};limit:{users.filters?.limit};{' '}
          </p>
        </div>
        <ul data-testid='users-list'>
          {Array.isArray((users.data as Users)?.results) &&
            (users.data as Users).results.map((user) => {
              return (
                <li key={user.name}>
                  {user.name}:{user.age}
                </li>
              );
            })}
        </ul>
      </div>
      <h4>Set Data</h4>
      <div style={{ display: 'flex' }}>
        <button
          data-testid='setdata'
          onClick={() => {
            users.setData({ name: 'test', age: 12 });
          }}
        >
          setData
        </button>
        <button
          data-testid='setdata-reducer-object'
          onClick={() => {
            users.setData({ age: 2 }, { reducer: 'object' });
          }}
        >
          setData with object reducer
        </button>
        <button
          data-testid='setdata-reducer-none'
          onClick={() => {
            users.setData({ name: 'none', age: 0 }, { reducer: 'none' });
          }}
        >
          setData with none reducer
        </button>
        <button
          data-testid='setdata-reducer-replace'
          onClick={() => {
            users.setData({ name: 'none', age: 0 }, { reducer: 'replace' });
          }}
        >
          setData with replace reducer
        </button>
      </div>
      <h4>Set Loading</h4>
      <div style={{ display: 'flex' }}>
        <button
          data-testid='setloading-true'
          onClick={() => {
            users.setLoading(true);
          }}
        >
          Set loading true
        </button>
        <button
          data-testid='setloading-false'
          onClick={() => {
            users.setLoading(false);
          }}
        >
          Set loading false
        </button>
      </div>
      <h4>Set Errors</h4>
      <div style={{ display: 'flex' }}>
        <button
          data-testid='set-errors'
          onClick={() => {
            users.setErrors({ error: 'Required' });
          }}
        >
          Set errors
        </button>
      </div>
      <h4>Set Filters</h4>
      <div style={{ display: 'flex' }}>
        <button
          data-testid='set-filters'
          onClick={() => {
            users.setFilters({ offset: 10, limit: 12 });
          }}
        >
          Set filters
        </button>
      </div>
      <h4>Clear resource</h4>
      <div style={{ display: 'flex' }}>
        <button
          data-testid='clear-resource'
          onClick={() => {
            users.clear();
          }}
        >
          clear all
        </button>
      </div>
      <h4>GET user data</h4>
      <div>
        <button
          data-testid='get-user-by-id'
          onClick={() => {
            users.fetch({ uuid });
          }}
        >
          get user by ID
        </button>
      </div>
      <h4>GET users list</h4>
      <div>
        <button
          data-testid='get-users'
          onClick={() => {
            users.fetch({ offset: 0, limit: 5 }, { queries: ['offset', 'limit'] });
          }}
        >
          get users
        </button>
        <button
          data-testid='get-next-users'
          onClick={() => {
            users.fetch({ offset: 5, limit: 5 }, { queries: ['offset', 'limit'], reducer: 'infinityList' });
          }}
        >
          get next users
        </button>
      </div>
      <h4>DELETE UPDATE CREATE user</h4>
      <div>
        <button
          data-testid='post-request'
          onClick={() => {
            users.create({ name: 12, age: 12 });
          }}
        >
          create user
        </button>

        <button
          data-testid='post-request-queries'
          onClick={() => {
            users.create({ name: 12, age: 12 }, { filters: { offset: 12 } });
          }}
        >
          create user with Url query params
        </button>
        <button
          data-testid='patch-request'
          onClick={() => {
            users.update({ name: 12, age: 12, uuid });
          }}
        >
          update user
        </button>
        <button
          data-testid='patch-request-queries'
          onClick={() => {
            users.update({ name: 12, age: 12 }, { filters: { offset: 12, uuid } });
          }}
        >
          update user with Url query params
        </button>
        <button
          data-testid='put-request'
          onClick={() => {
            users.replace({ name: 12, age: 12, uuid });
          }}
        >
          replace user
        </button>
        <button
          data-testid='put-request-queries'
          onClick={() => {
            users.replace({ name: 12, age: 12 }, { filters: { offset: 12, uuid } });
          }}
        >
          replace user with Url query params
        </button>
        <button
          data-testid='delete-request'
          onClick={() => {
            users.remove({ uuid });
          }}
        >
          delete user
        </button>
      </div>
      <h4>Abort request</h4>
      <div>
        <button
          data-testid='send-abort-request'
          onClick={() => {
            pendingPromise.current = users.fetch({ uuid });
          }}
        >
          send request
        </button>
        <button
          data-testid='abort-request'
          onClick={() => {
            pendingPromise.current.cancel();
          }}
        >
          abort request
        </button>
      </div>
      <h4>Skip errors and loadings</h4>
      <div>
        <button
          data-testid='skip-errors'
          onClick={() => {
            users.remove({ uuid }, { forceUpdates: true });
          }}
        >
          skip errors and loadings
        </button>
      </div>
    </div>
  );
};

const ResourceComponent = connectResources<UserProps>('/users/:uuid?')(Resource);

describe(specTitle('connectResources'), () => {
  it('simple actions', () => {
    cy.mount(
      <ResourcesProvider>
        <ResourceComponent uuid='test' />
      </ResourcesProvider>
    );
    cy.get('[data-testid=setdata]').click();
    cy.get('[data-testid=data]').should('contain', 'test:12');
    cy.get('[data-testid=setdata-reducer-object]').click();
    cy.get('[data-testid=data]').should('contain', 'test:2');
    cy.get('[data-testid=setdata-reducer-none]').click();
    cy.get('[data-testid=data]').should('contain', 'test:2');
    cy.get('[data-testid=setdata-reducer-replace]').click();
    cy.get('[data-testid=data]').should('contain', 'none:0');
    cy.get('[data-testid=setloading-true]').click();
    cy.get('[data-testid=loading]').should('contain', 'Loading');
    cy.get('[data-testid=setloading-false]').click();
    cy.get('[data-testid=loading]').should('contain', 'not loading');
    cy.get('[data-testid=errors]').should('contain', 'no Errors');
    cy.get('[data-testid=set-errors]').click();
    cy.get('[data-testid=errors]').should('contain', 'Required');
    cy.get('[data-testid=filters]').should('contain', 'offset:;limit:;');
    cy.get('[data-testid=set-filters]').click();
    cy.get('[data-testid=filters]').should('contain', 'offset:10;limit:12;');
    cy.get('[data-testid=clear-resource]').click();
    cy.get('[data-testid=filters]').should('contain', 'offset:;limit:;');
    cy.get('[data-testid=errors]').should('contain', 'no Errors');
    cy.get('[data-testid=loading]').should('contain', 'not loading');
    cy.get('[data-testid=data]').should('contain', ':');
  });
  it('get user by ID', () => {
    cy.intercept('GET', '/users/*', (req) => {
      req.reply({
        status: 200,
        delay: 500,
        body: {
          name: 'testing',
          age: 12
        }
      });
    }).as('userInfo');
    cy.mount(
      <ResourcesProvider>
        <ResourceComponent uuid='testing' />
      </ResourcesProvider>
    );
    cy.get('[data-testid=loading]').should('contain', 'not loading');
    cy.get('[data-testid=get-user-by-id]').click();
    cy.get('[data-testid=loading]').should('contain', 'Loading');
    cy.wait('@userInfo');
    cy.get('[data-testid=data]').should('contain', 'testing:12');
    cy.get('[data-testid=loading]').should('contain', 'not loading');
  });

  it('get users list', () => {
    cy.intercept('GET', '/users*', (req) => {
      const url = new URL(req.url);
      const offset = parseInt((url.search.split('&').pop() as string).split('=').pop() as string);
      const results = [];
      for (let i = offset; i < offset + 5; i++) {
        results.push({
          // eslint-disable-next-line
                    name: 'name' + i,
          age: i * 6
        });
      }
      req.reply({
        body: {
          count: 10,
          results
        }
      });
    }).as('users');
    cy.mount(
      <ResourcesProvider>
        <ResourceComponent uuid='test' />
      </ResourcesProvider>
    );
    cy.get('[data-testid=get-users]').click();
    cy.wait('@users');
    cy.get('[data-testid=filters]').should('contain', 'offset:0;limit:5;');
    cy.get('[data-testid=users-list] li').should('have.length', 5);
    cy.get('[data-testid=users-list] li').should((items) => {
      expect(items[0]).to.contain.text('name0:0');
      expect(items[1]).to.contain.text('name1:6');
      expect(items[2]).to.contain.text('name2:12');
      expect(items[3]).to.contain.text('name3:18');
      expect(items[4]).to.contain.text('name4:24');
    });
    cy.get('[data-testid=get-next-users]').click();
    cy.wait('@users');
    cy.get('[data-testid=filters]').should('contain', 'offset:5;limit:5;');
    cy.get('[data-testid=users-list] li').should('have.length', 10);
    cy.get('[data-testid=users-list] li').should((items) => {
      expect(items[5]).to.contain.text('name5:30');
      expect(items[6]).to.contain.text('name6:36');
      expect(items[7]).to.contain.text('name7:42');
      expect(items[8]).to.contain.text('name8:48');
      expect(items[9]).to.contain.text('name9:54');
    });
  });

  it('POST PUT DELET PATCH', () => {
    cy.mount(
      <ResourcesProvider>
        <ResourceComponent uuid='test' />
      </ResourcesProvider>
    );
    cy.intercept('POST', '/users*', {
      fixture: 'user.json'
    }).as('createUser');
    cy.intercept('PATCH', '/users/test*', {
      fixture: 'user.json'
    }).as('updateUser');
    cy.intercept('PUT', '/users/test*', {
      fixture: 'user.json'
    }).as('replaceUser');
    cy.intercept('DELETE', '/users/test', {
      fixture: 'user.json'
    }).as('deleteUser');

    cy.get('[data-testid=post-request]').click();
    cy.wait('@createUser');
    cy.get('[data-testid=data]').should('contain', 'testUser:101');

    cy.get('[data-testid=clear-resource]').click();

    cy.get('[data-testid=patch-request]').click();
    cy.wait('@updateUser');
    cy.get('[data-testid=data]').should('contain', 'testUser:101');

    cy.get('[data-testid=put-request]').click();
    cy.wait('@replaceUser');
    cy.get('[data-testid=data]').should('contain', 'testUser:101');

    cy.get('[data-testid=clear-resource]').click();

    cy.get('[data-testid=delete-request]').click();
    cy.wait('@deleteUser');
    cy.get('[data-testid=data]').should('contain', 'testUser:101');

    cy.get('[data-testid=post-request-queries]').click();
    cy.wait('@createUser').its('request.url').should('include', '/users?offset=12');

    cy.get('[data-testid=patch-request-queries]').click();
    cy.wait('@updateUser').its('request.url').should('include', '/users/test?offset=12');
    cy.get('[data-testid=put-request-queries]').click();
    cy.wait('@replaceUser').its('request.url').should('include', '/users/test?offset=12');
  });

  it('should handle errors', () => {
    cy.mount(
      <ResourcesProvider>
        <ResourceComponent uuid='test' />
      </ResourcesProvider>
    );
    cy.intercept('DELETE', '/users/test', {
      statusCode: 400,
      body: {
        error: "You don't have permissions"
      }
    }).as('deleteUser');
    cy.get('[data-testid=delete-request]').click();
    cy.wait('@deleteUser');
    cy.get('[data-testid=errors]').should('contain', "You don't have permissions");

    cy.get('[data-testid=clear-resource]').click();

    cy.get('[data-testid=skip-errors]').click();
    cy.wait('@deleteUser');
    cy.get('[data-testid=errors]').should('contain', 'no Errors');
  });

  it('should handle abort request', () => {
    cy.intercept('GET', '/users/test', (req) => {
      req.reply({
        delay: 1000,
        body: {
          name: 'abortde request',
          age: 12
        }
      });
    }).as('abortRequest');
    cy.mount(
      <ResourcesProvider>
        <ResourceComponent uuid='test' />
      </ResourcesProvider>
    );
    cy.get('[data-testid=send-abort-request]').click();
    cy.get('[data-testid=abort-request]').click();
    cy.get('[data-testid=data]').should('not.contain', 'abortde request:12');
    cy.get('[data-testid=errors]').should('contain', 'no Errors');
  });
});
