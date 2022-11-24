import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { AccessProvider, composeAccess, usePermissions, useHasAccess, CheckAccess, hasPermission } from 'access/lib';
import get from 'lodash/get';

const F_PROTECTED = 'F_PROTECTED';
const F_UNAUTHORISED = 'F_UNAUTHORISED';
const F_ADMIN = 'F_ADMIN';
const F_SUPER_USER = 'F_SUPER_USER';

function AllPermissions() {
  const permissions = usePermissions();
  return <p data-testid='all-permission'>{permissions.join(', ')}</p>;
}

function HooksCheck() {
  return (
    <>
      <p data-testid='F_PROTECTED-hook'>F_PROTECTED: {useHasAccess(F_PROTECTED) ? 'TRUE' : 'FALSE'}</p>
      <p data-testid='empty-hook'>empty: {useHasAccess() ? 'TRUE' : 'FALSE'}</p>
      <p data-testid='F_UNAUTHORISED-hook'>F_UNAUTHORISED: {useHasAccess(F_UNAUTHORISED) ? 'TRUE' : 'FALSE'}</p>
      <p data-testid='F_PROTECTED+ROLE_A-hook'>
        F_PROTECTED + ROLE_A: {useHasAccess([F_PROTECTED, 'ROLE_A']) ? 'TRUE' : 'FALSE'}
      </p>
      <p data-testid='F_UNAUTHORISED+ROLE_A-hook'>
        F_UNAUTHORISED + ROLE_A: {useHasAccess([F_UNAUTHORISED, 'ROLE_A']) ? 'TRUE' : 'FALSE'}
      </p>
      <p data-testid='F_UNAUTHORISED||ROLE_A-hook'>
        F_UNAUTHORISED || ROLE_A: {useHasAccess([F_UNAUTHORISED, 'ROLE_A'], 'SOME') ? 'TRUE' : 'FALSE'}
      </p>

      <p data-testid='F_PROTECTED-hook-old'>F_PROTECTED: {hasPermission(F_PROTECTED) ? 'TRUE' : 'FALSE'}</p>
    </>
  );
}

describe(specTitle('@cranium/access'), () => {
  it('should render components bases on permissions', () => {
    const acessLevels = composeAccess(
      // if there is user id then user is authorized and has access to portal.
      (props) => (get(props, 'session.id') ? F_PROTECTED : F_UNAUTHORISED),
      // define if user is admin
      (props) => (get(props, 'session.is_admin') ? F_ADMIN : null),
      // define if user is super user
      (props) => (get(props, 'session.is_super_user') ? F_SUPER_USER : null),
      (props) => props.userRoles,
      'ROLE_RE'
    );

    cy.mount(
      <AccessProvider acessLevels={acessLevels} session={{ id: 12 }} userRoles={['ROLE_A', 'ROLE_B']}>
        <CheckAccess access='F_PROTECTED'>
          <p data-testid='F_PROTECTED-JSX'>access: F_PROTECTED</p>
        </CheckAccess>
        <CheckAccess access='ROLE_A' fallback={<p data-testid='ROLE_A-JSX'>fallback: ROLE_A</p>}>
          <p data-testid='ROLE_A-JSX'>access: ROLE_A</p>
        </CheckAccess>
        <CheckAccess access='ROLE_C' fallback={<p data-testid='ROLE_C-JSX'>fallback: ROLE_C</p>}>
          <p data-testid='ROLE_C-JSX'>access: ROLE_C</p>
        </CheckAccess>
        <CheckAccess
          access={['ROLE_A', F_PROTECTED]}
          fallback={<p data-testid='ROLE_A+F_PROTECTED-JSX'>fallback: ROLE_A+F_PROTECTED</p>}
        >
          <p data-testid='ROLE_A+F_PROTECTED-JSX'>access: ROLE_A + F_PROTECTED</p>
        </CheckAccess>
        <CheckAccess
          access={['ROLE_A', F_PROTECTED, F_ADMIN]}
          fallback={<p data-testid='ROLE_A+F_PROTECTED+F_ADMIN-JSX'>fallback: ROLE_A+F_PROTECTED+F_ADMIN</p>}
        >
          <p data-testid='ROLE_A+F_PROTECTED+F_ADMIN-JSX'>access: ROLE_A + F_PROTECTED + F_ADMIN</p>
        </CheckAccess>
        <CheckAccess
          access={['ROLE_A', F_PROTECTED, F_ADMIN]}
          operator='SOME'
          fallback={<p data-testid='ROLE_A||F_PROTECTED||F_ADMIN-JSX'>fallback: ROLE_A || F_PROTECTED || F_ADMIN</p>}
        >
          <p data-testid='ROLE_A||F_PROTECTED||F_ADMIN-JSX'>access: ROLE_A || F_PROTECTED || F_ADMIN</p>
        </CheckAccess>
        <CheckAccess
          access={['ROLE_C', F_SUPER_USER, F_ADMIN]}
          operator='SOME'
          fallback={<p data-testid='ROLE_C||F_SUPER_USER||F_ADMIN-JSX'>fallback: ROLE_C || F_SUPER_USER || F_ADMIN</p>}
        >
          <p data-testid='ROLE_C||F_SUPER_USER||F_ADMIN-JSX'>access: ROLE_C || F_SUPER_USER || F_ADMIN</p>
        </CheckAccess>

        <AllPermissions />
        <HooksCheck />
      </AccessProvider>
    );

    cy.get('[data-testid="F_PROTECTED-JSX"]').should('contain', 'access: F_PROTECTED');
    cy.get('[data-testid="ROLE_A-JSX"]').should('contain', 'access: ROLE_A');
    cy.get('[data-testid="ROLE_A-JSX"]').should('not.contain', 'fallback: ROLE_A');

    cy.get('[data-testid="ROLE_C-JSX"]').should('contain', 'fallback: ROLE_C');
    cy.get('[data-testid="ROLE_C-JSX"]').should('not.contain', 'access: ROLE_C');

    cy.get('[data-testid="ROLE_A+F_PROTECTED-JSX"]').should('contain', 'access: ROLE_A + F_PROTECTED');
    cy.get('[data-testid="ROLE_A+F_PROTECTED-JSX"]').should('not.contain', 'fallback: ROLE_A+F_PROTECTED');

    cy.get('[data-testid="ROLE_A+F_PROTECTED+F_ADMIN-JSX"]').should('contain', 'fallback: ROLE_A+F_PROTECTED+F_ADMIN');
    cy.get('[data-testid="ROLE_A+F_PROTECTED+F_ADMIN-JSX"]').should(
      'not.contain',
      'access: ROLE_A + F_PROTECTED + F_ADMIN'
    );

    cy.get('[data-testid="ROLE_A||F_PROTECTED||F_ADMIN-JSX"]').should(
      'contain',
      'access: ROLE_A || F_PROTECTED || F_ADMIN'
    );
    cy.get('[data-testid="ROLE_A||F_PROTECTED||F_ADMIN-JSX"]').should(
      'not.contain',
      'fallback: ROLE_A || F_PROTECTED || F_ADMIN'
    );

    cy.get('[data-testid="ROLE_C||F_SUPER_USER||F_ADMIN-JSX"]').should(
      'contain',
      'fallback: ROLE_C || F_SUPER_USER || F_ADMIN'
    );
    cy.get('[data-testid="ROLE_C||F_SUPER_USER||F_ADMIN-JSX"]').should(
      'not.contain',
      'access: ROLE_C || F_SUPER_USER || F_ADMIN'
    );

    cy.get('[data-testid="all-permission"]').should('contain', 'F_PROTECTED, ROLE_A, ROLE_B');

    cy.get('[data-testid="empty-hook"]').should('contain', 'empty: TRUE');
    cy.get('[data-testid="F_PROTECTED-hook"]').should('contain', 'F_PROTECTED: TRUE');
    cy.get('[data-testid="F_UNAUTHORISED-hook"]').should('contain', 'F_UNAUTHORISED: FALSE');
    cy.get('[data-testid="F_PROTECTED+ROLE_A-hook"]').should('contain', 'F_PROTECTED + ROLE_A: TRUE');
    cy.get('[data-testid="F_UNAUTHORISED+ROLE_A-hook"]').should('contain', 'F_UNAUTHORISED + ROLE_A: FALSE');
    cy.get('[data-testid="F_UNAUTHORISED||ROLE_A-hook"]').should('contain', 'F_UNAUTHORISED || ROLE_A: TRUE');

    cy.get('[data-testid="F_PROTECTED-hook-old"]').should('contain', 'F_PROTECTED: TRUE');
  });

  it('should work without acessLevels', () => {
    cy.mount(
      <AccessProvider userRoles={['ROLE_A', 'ROLE_B']}>
        <CheckAccess access='ROLE_A' fallback={<p data-testid='ROLE_A-JSX'>fallback: ROLE_A</p>}>
          <p data-testid='ROLE_A-JSX'>access: ROLE_A</p>
        </CheckAccess>
        <p data-testid='child'>Child</p>
      </AccessProvider>
    );
    cy.get('[data-testid="ROLE_A-JSX"]').should('contain', 'fallback: ROLE_A');
    cy.get('[data-testid="child"]').should('exist');
  });

  it('should pass all props to acessLevels', () => {
    const acessLevels = composeAccess(
      // if there is user id then user is authorized and has access to portal.
      (props) =>
        Object.values(props).reduce((res, prop) => {
          if (Array.isArray(prop)) {
            return [...res, ...prop];
          }
          return [...res, prop];
        }, [])
    );

    cy.mount(
      <AccessProvider
        acessLevels={acessLevels}
        userRoles={['ROLE_A', 'ROLE_B']}
        userPermissions={['PERMISSION_A', 'PERMISSION_B']}
        F_UNAUTHORISED={F_UNAUTHORISED}
      >
        <AllPermissions />
      </AccessProvider>
    );
    cy.get('[data-testid="all-permission"]').should(
      'contain',
      'ROLE_A, ROLE_B, PERMISSION_A, PERMISSION_B, F_UNAUTHORISED'
    );
  });
});
