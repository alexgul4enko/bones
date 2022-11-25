import { createContext, useMemo, useContext, PropsWithChildren, FC, ReactNode } from 'react';

const AcessContext = createContext<Set<string>>(new Set() as Set<string>);

export type AccessProviderProps = {
  acessLevels: (props: { [key: string]: unknown }) => Set<string>;
  [key: string]: unknown;
};

export const AccessProvider: FC<PropsWithChildren<AccessProviderProps>> = ({ children, acessLevels, ...props }) => {
  const permissions = useMemo(
    () => (typeof acessLevels === 'function' ? acessLevels(props) : (new Set() as Set<string>)),
    [acessLevels, props]
  );
  return <AcessContext.Provider value={permissions}>{children}</AcessContext.Provider>;
};

export type AccessFn = (props: { [key: string]: unknown }) => string | string[] | null | undefined | false;

export const composeAccess = (...args: AccessFn[]) => {
  return function (props: { [key: string]: unknown }) {
    return new Set(
      args
        .reduce((res, rule) => {
          if (typeof rule !== 'function') {
            return res;
          }
          const rules = rule(props);
          if (Array.isArray(rules)) {
            return [...res, ...rules];
          }
          return [...res, rules];
        }, [])
        .filter(Boolean)
    );
  };
};

export function usePermissions() {
  return useContext(AcessContext);
}

export function useHasAccess(access: string | string[], operator?: 'ALL' | 'SOME') {
  if (!access) {
    return true;
  }
  const userPermissions = useContext(AcessContext);
  return useMemo(() => {
    if (Array.isArray(access)) {
      const operation = operator === 'SOME' ? 'some' : 'every';
      return access[operation]((level) => userPermissions.has(level));
    }
    return userPermissions.has(access);
  }, [userPermissions, access]);
}

export function hasPermission(access: string | string[], operator?: 'ALL' | 'SOME') {
  return useHasAccess(access, operator);
}

export interface CheckAccessProps {
  access: string | string[];
  operator?: 'ALL' | 'SOME';
  fallback?: ReactNode;
}

export const CheckAccess: FC<PropsWithChildren<CheckAccessProps>> = ({
  access,
  operator,
  fallback = null,
  children
}) => {
  return useHasAccess(access, operator) ? <>{children}</> : <>{fallback}</>;
};
