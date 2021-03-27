import React from 'react';

type InitialState = {
  status?: 'idle' | 'pending' | 'rejected' | 'resolved';
  error?: Error | null;
  data?: Record<string, string> | null;
};

type ActionTypes =
  | {status: 'pending'}
  | {status: 'resolved'; data: Record<string, string>}
  | {status: 'rejected'; error: Error};

function useSafeDispatch(dispatch: React.Dispatch<ActionTypes>) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return React.useCallback(
    action => (mounted.current ? dispatch(action) : undefined),
    [dispatch],
  );
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState: InitialState = {
  status: 'idle',
  data: null,
  error: null,
};
export function useAsync<T>(initialState?: InitialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });

  function reducer(state: InitialState, action: ActionTypes): InitialState {
    return {
      ...state,
      ...action,
    };
  }

  const [{status, data, error}, setState] = React.useReducer(
    reducer,
    initialStateRef.current,
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (newData: T) => safeSetState({status: 'resolved', data: newData}),
    [safeSetState],
  );
  const setError = React.useCallback(
    (newError: Error) => safeSetState({status: 'rejected', error: newError}),
    [safeSetState],
  );
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ]);

  const run = React.useCallback(
    (promise: Promise<T>) => {
      if (!promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        );
      }
      safeSetState({status: 'pending'});
      return promise
        .then(promiseData => {
          safeSetState({status: 'resolved', data: promiseData});

          return promiseData;
        })
        .catch(promiseError => {
          if (promiseError instanceof Error) {
            safeSetState({status: 'rejected', error: promiseError});
            return promiseError;
          }

          if (typeof promiseError === 'object' && 'message' in promiseError) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const e = new Error(promiseError.message);
            safeSetState({
              status: 'rejected',
              error: e,
            });
            return e;
          }

          safeSetState({
            status: 'rejected',
            error: new Error(JSON.stringify(promiseError)),
          });
          return new Error(JSON.stringify(promiseError));
        });
    },
    [safeSetState],
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}
