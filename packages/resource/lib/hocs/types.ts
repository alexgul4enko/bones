import { FunctionComponent, PropsWithChildren } from 'react';

export interface PrefetchOptions {
  refresh?: boolean;
  destroyOnUnmount?: boolean;
  defaultParams?: Record<string, any>;
  method?: 'POST' | 'GET';
  Loader?: FunctionComponent<{ isLoading?: boolean }>;
  idKey?: string;
}

export interface DefaultOption {
  refresh: boolean;
  destroyOnUnmount: boolean;
  defaultParams: Record<string, any>;
  method?: 'POST' | 'GET';
  Loader: FunctionComponent<PropsWithChildren<{ isLoading?: boolean }>>;
  idKey?: string;
}
