import { FC, PropsWithChildren } from 'react';

export interface LoaderProps {
  isLoading?: boolean;
}
/*
 * Default Loader Component
 * Do not render component while requests are pending
 */
export const Loader: FC<PropsWithChildren<LoaderProps>> = ({ children, isLoading }) => {
  if (isLoading) {
    return null;
  }
  return <>{children}</>;
};
