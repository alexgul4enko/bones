import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { FC, useState } from 'react';
import {
  prefetchResources,
  customResource,
  CustomResourceType,
  makeCancelablePromise,
  ResourcesProvider,
  useClearAll
} from '../../../packages/resource/lib';
import { useSelector } from 'react-redux';

interface User {
  name: string;
  uuid: number;
}

interface OwnProps {
  name: string;
}

interface UserProps {
  user?: CustomResourceType<User>;
  car?: CustomResourceType<User>;
}

const connect = customResource<UserProps>(myCustoFetch);

function myCustoFetch(api: any, payload: { name: string }) {
  const controller = new AbortController();
  return makeCancelablePromise(
    new Promise<User>((resolve) => {
      resolve({
        name: payload.name,
        uuid: payload.name.length * 12
      });
    }),
    controller
  );
}

const MyElement: FC<UserProps> = ({ user, car }) => {
  if (user) {
    return (
      <div style={{ margin: '20px', padding: '20px', border: '1px solid' }}>
        <h1>User</h1>
        <p data-testid='resource-user-name'>name:{user.data?.name}</p>
        <p data-testid='resource-user-uuid'> uuid:{user.data?.uuid}</p>
      </div>
    );
  }
  if (car) {
    return (
      <div style={{ margin: '20px', padding: '20px', border: '1px solid' }}>
        <h1>Car</h1>
        <p data-testid='resource-car-name'>name:{car.data?.name}</p>
        <p data-testid='resource-car-uuid'> uuid:{car.data?.uuid}</p>
      </div>
    );
  }
  return null;
};

const MyElementWithData = prefetchResources<OwnProps>(connect({ namespace: 'user', endpoint: '/users/:name' }))(
  MyElement
);

const MyElementWithDataNoClear = prefetchResources<OwnProps>(connect({ namespace: 'car', endpoint: '/cars/:name' }), {
  destroyOnUnmount: false,
  refresh: false,
  idKey: 'name'
})(MyElement);

interface AppState {
  user?: {
    data?: User;
  };
  car?: {
    data?: User;
  };
}
const TestPrefetch: FC<any> = () => {
  const user = useSelector((state: AppState) => state?.user);
  const car = useSelector((state: AppState) => state?.car);
  const [isShown, setShown] = useState(true);
  const clearAll = useClearAll();
  return (
    <div style={{ display: 'flex' }}>
      {isShown ? <MyElementWithData name='Alex' /> : null}
      {isShown ? <MyElementWithDataNoClear name='BMW' /> : null}
      <div>
        <p data-testid='store-user-data-name'>name:{user?.data?.name || 'no data'}</p>
        <p data-testid='store-user-data-uuid'>uuid:{user?.data?.uuid || 'no data'}</p>
        <p data-testid='store-car--data-name'>name:{car?.data?.name || 'no data'}</p>
        <p data-testid='store-car--data-uuid'>uuid:{car?.data?.uuid || 'no data'}</p>
        <button data-testid='remove-hoc' onClick={() => setShown(false)}>
          remove HOC
        </button>
        <button data-testid='remove-All' onClick={() => clearAll()}>
          remove all data
        </button>
      </div>
    </div>
  );
};

describe(specTitle('prefetch HOCS'), () => {
  it('prefetch resources', () => {
    cy.intercept('GET', '/users*', {
      fixture: 'userdata.json'
    }).as('getUser');
    cy.intercept('GET', '/cars*', {
      fixture: 'car.json'
    }).as('geCar');

    cy.mount(
      <ResourcesProvider>
        <TestPrefetch />
      </ResourcesProvider>
    );
    cy.get('[data-testid=resource-user-name]').should('contain', 'name:Alex');
    cy.get('[data-testid=resource-user-uuid]').should('contain', 'uuid:48');
    cy.get('[data-testid=resource-car-name]').should('contain', 'name:BMW');
    cy.get('[data-testid=resource-car-uuid]').should('contain', 'uuid:36');

    cy.get('[data-testid=store-user-data-name]').should('contain', 'name:Alex');
    cy.get('[data-testid=store-user-data-uuid]').should('contain', 'uuid:48');
    cy.get('[data-testid=store-car--data-name]').should('contain', 'name:BMW');
    cy.get('[data-testid=store-car--data-uuid]').should('contain', 'uuid:36');
    cy.get('[data-testid=remove-hoc]').click();
    // clear redux store on unmount
    cy.get('[data-testid=store-user-data-name]').should('contain', 'name:no data');
    cy.get('[data-testid=store-user-data-uuid]').should('contain', 'uuid:no data');
    // do not clear redux store on unmount if destroyOnUnmount is false
    cy.get('[data-testid=store-car--data-name]').should('contain', 'name:BMW');
    cy.get('[data-testid=store-car--data-uuid]').should('contain', 'uuid:36');

    cy.get('[data-testid=remove-All]').click();
    cy.get('[data-testid=store-car--data-name]').should('contain', 'name:no data');
    cy.get('[data-testid=store-car--data-uuid]').should('contain', 'uuid:no data');
  });
});
