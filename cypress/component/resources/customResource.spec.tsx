import { FC } from 'react';
import specTitle from 'cypress-sonarqube-reporter/specTitle';
import {
  ResourcesProvider,
  CustomResourceType,
  makeCancelablePromise,
  customResource
} from '../../../packages/resource/lib';
import { compose } from 'redux';

interface User {
  name: string;
}

interface UserProps {
  user: CustomResourceType<User>;
  car: CustomResourceType<User>;
}

function myCustoFetch(api: unknown, payload: string) {
  return makeCancelablePromise(
    new Promise<User>((resolve) => {
      resolve({
        name: payload
      });
    })
  );
}

const connect = customResource<UserProps>(myCustoFetch);

const CustomResource: FC<UserProps> = ({ user, car }) => {
  return (
    <div>
      <h1>Custom resource</h1>
      <p data-testid='custom-user-data'>user data: {user.data?.name}</p>
      <p data-testid='custom-car-data'>user data: {car.data?.name}</p>
      <button
        data-testid='get-custom-user-data'
        onClick={() => {
          user.request('Alex');
        }}
      >
        get user
      </button>
      <button
        data-testid='get-custom-car-data'
        onClick={() => {
          car.request('BMW');
        }}
      >
        get user car
      </button>
    </div>
  );
};

const Component = compose(
  connect('user'),
  connect({
    namespace: 'car'
  })
)(CustomResource) as FC<any>;

describe(specTitle('customResource'), () => {
  it('should work properly', () => {
    cy.mount(
      <ResourcesProvider>
        <Component />
      </ResourcesProvider>
    );

    cy.get('[data-testid=get-custom-user-data]').click();
    cy.get('[data-testid=get-custom-car-data]').click();
    cy.get('[data-testid=custom-user-data]').should('contain', 'user data: Alex');
    cy.get('[data-testid=custom-car-data]').should('contain', 'user data: BMW');
  });
});
