import specTitle from 'cypress-sonarqube-reporter/specTitle';
import {
  createActionsMiddleware,
  persistReducer,
  reset,
  RESET_STORE,
  composeReducers,
  combineReducers
} from 'redux-helpers/lib';

describe(specTitle('@cranium/redux-helpers'), () => {
  context('createActionsMiddleware', () => {
    const middleware = createActionsMiddleware('API');
    const store = {
      dispatch: (a: any) => {
        return a;
      },
      getState: () => ({})
    };
    function next(a: any) {
      return a;
    }

    it('should return action payload if action is not async', () => {
      const action = {
        type: 'test'
      };
      const res = middleware(store)(next)(action);
      expect(res.type).to.equal('test');
    });

    it('should call async actions', () => {
      function action() {
        return 'test';
      }
      const res = middleware(store)(next)(action);
      expect(res).to.equal('test');
    });

    it('should call async actions and pass dispatch function', () => {
      function action(dispatch) {
        return dispatch;
      }
      const res = middleware(store)(next)(action);
      expect(res).to.eql(store.dispatch);
    });

    it('should call async actions and pass getState function', () => {
      function action(dispatch, getState) {
        return getState;
      }
      const res = middleware(store)(next)(action);
      expect(res).to.eql(store.getState);
    });

    it('should call async actions and pass API function', () => {
      function action(dispatch, getState, api) {
        return api;
      }
      const res = middleware(store)(next)(action);
      expect(res).to.equal('API');
    });
  });

  context('combineReducers', () => {
    const reducers = {
      user: (store = {}, action) => {
        switch (action.type) {
          case 'TEST':
            return {
              name: 'test'
            };
          default:
            return store;
        }
      },
      car: (store = '', action) => {
        switch (action.type) {
          case 'TEST':
            return 'BMW';
          default:
            return store;
        }
      }
    };
    const initialStore = {
      user: {},
      car: ''
    };
    const mainReducer = combineReducers(reducers);

    it('should initialize store with its data', () => {
      expect(mainReducer(undefined, { type: 'INITiALIZE' })).to.deep.equal(initialStore);
    });
    it('should return same store if there is no reducer for such action', () => {
      expect(mainReducer({}, { type: 'TYPE' })).to.deep.equal(initialStore);
    });
    it('should apply reducer changes', () => {
      expect(mainReducer({}, { type: 'TEST' })).to.deep.equal({
        user: { name: 'test' },
        car: 'BMW'
      });
    });
  });

  context('composeReducers', () => {
    const initialStore = {
      user: {},
      car: ''
    };

    function clearReducer(store = {}, action) {
      switch (action.type) {
        case 'LOGOUT':
          return {};
        default:
          return store;
      }
    }
    function persistReducer(store = {}, action) {
      switch (action.type) {
        case 'PERSISTS':
          return {
            localCache: 'data'
          };
        default:
          return store;
      }
    }

    const mainReducer = composeReducers(initialStore, persistReducer, clearReducer);

    it('should return same store if action not hadled', () => {
      expect(mainReducer(undefined, { type: 'INITiALIZE' })).to.deep.equal(initialStore);
    });
    it('should return modified store if action was handled by reducer', () => {
      expect(mainReducer(undefined, { type: 'LOGOUT' })).to.deep.equal({});
    });
  });

  context('persistReducer', () => {
    const reducer = persistReducer(['recentLinks']);

    it('should return store if clear action was not called', () => {
      expect(reducer('store', { type: 'TEST' })).to.equal('store');
    });
    it('should clear all not whitelisted keys from store', () => {
      expect(
        reducer(
          {
            user: { name: 'test' },
            recentLinks: ['profile']
          },
          reset()
        )
      ).to.deep.equal({ recentLinks: ['profile'] });
    });
    it('should work with empty arguments', () => {
      const reducer = persistReducer();
      expect(reducer(undefined, { type: 'TEST' })).to.deep.equal({});
    });
    it('should return reset action type', () => {
      expect(reset().type).to.equal(RESET_STORE);
    });
  });
});
