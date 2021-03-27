/* eslint-disable camelcase */
import Auth, {CognitoUser} from '@aws-amplify/auth';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {IDENTITY_LOCALSTORAGE_KEY, JWT_LOCALSTORAGE_KEY} from 'src/constants';
import type {UpdatableUserAttributes} from './auth-reducer';
import {authReducer, AuthReducerAction, AuthState} from './auth-reducer';

type AuthContextValue = [AuthState, React.Dispatch<AuthReducerAction>];

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: React.FC = props => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: false,
    error: undefined,
    isAuthenticated: false,
    isAuthenticating: true,
    user: undefined,
    userConfig: undefined,
  });

  const value = useMemo(() => [state, dispatch], [state]) as AuthContextValue;

  return <AuthContext.Provider value={value} {...props} />;
};

export type CognitoUserAttributes = {
  email: string;
  family_name: string;
  given_name: string;
  picture?: string;
  'custom:bio'?: string;
  phone_number?: string;
  'custom:country'?: string;
  'custom:city'?: string;
  address?: string;
  'custom:isAdmin'?: boolean;
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const [state, dispatch] = context;

  const setIdentityIdInLocalStorage = useCallback(async () => {
    const credentials = await Auth.currentCredentials();
    localStorage.setItem(IDENTITY_LOCALSTORAGE_KEY, credentials.identityId);
  }, []);

  const setTokenInLocalStorage = useCallback((cognitoUser: CognitoUser) => {
    localStorage.setItem(
      JWT_LOCALSTORAGE_KEY,
      cognitoUser.getSignInUserSession()?.getIdToken().getJwtToken() || '',
    );
  }, []);

  const getCurrentUser = useCallback(async () => {
    const cognitoUser = (await Auth.currentAuthenticatedUser()) as CognitoUser & {
      attributes: CognitoUserAttributes;
    };

    console.log('user is', cognitoUser);

    return cognitoUser;
  }, []);

  const initializeUser = useCallback(async () => {
    try {
      const cognitoUser = await getCurrentUser();
      setTokenInLocalStorage(cognitoUser);

      await setIdentityIdInLocalStorage();

      const {attributes} = cognitoUser;
      dispatch({
        type: 'LOGIN_SUCCESS',
        userConfig: cognitoUser,
        user: {
          email: attributes.email,
          familyName: attributes.family_name,
          givenName: attributes.given_name,
          bio: attributes['custom:bio'],
          picture: attributes.picture,
          phoneNumber: attributes.phone_number,
          country: attributes['custom:country'],
          city: attributes['custom:city'],
          address: attributes.address,
          isAdmin: attributes['custom:isAdmin'],
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        dispatch({type: 'LOGIN_FAILURE', error: e});
      } else if (JSON.stringify(e).toLowerCase().includes('no current user')) {
        dispatch({type: 'LOGIN_FAILURE', error: undefined});
      } else {
        dispatch({type: 'LOGIN_FAILURE', error: new Error(e)});
      }

      localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
    }
  }, [
    dispatch,
    getCurrentUser,
    setIdentityIdInLocalStorage,
    setTokenInLocalStorage,
  ]);

  const updateUserAttributes = useCallback(
    (attributesToUpdate: UpdatableUserAttributes) => {
      dispatch({
        type: 'UPDATE_USER',
        updatedUserAttributes: attributesToUpdate,
      });
    },
    [dispatch],
  );

  return {
    state,
    dispatch,
    initializeUser,
    updateUserAttributes,
  };
}

export {AuthProvider, useAuth};
