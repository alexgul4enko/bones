import { FC, useMemo, PropsWithChildren } from 'react';
import { resourcesReducer } from './resources';
import { persistReducer, createActionsMiddleware, composeReducers, combineReducers } from '@cranium/redux-helpers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { API as CRAPI } from '@cranium/api';
import { API } from './types';

export type ResourcesProviderProps = {
  api?: API;
};

export const ResourcesProvider: FC<PropsWithChildren<ResourcesProviderProps>> = ({ children, api = new CRAPI() }) => {
  const store = useMemo(() => {
    return createStore(
      composeReducers({}, combineReducers({}), persistReducer([]), resourcesReducer),
      {},
      composeWithDevTools(applyMiddleware(...[createActionsMiddleware(api)]))
    );
  }, []);
  return <Provider store={store}>{children}</Provider>;
};
