/*
 * Rudux middleware for async actions like redux-thunk
 */
export function createActionsMiddleware(extraArgument: any) {
  const middleware: any =
    ({ dispatch, getState }: any) =>
    (next: (action: any) => void) =>
    (action: (dispatch: any, getState: any, extraArgument: any) => void) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
  return middleware;
}
