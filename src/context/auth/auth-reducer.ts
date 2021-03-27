import type {CognitoUser} from '@aws-amplify/auth';

export type User = {
  email: string;
  familyName: string;
  givenName: string;
  bio?: string;
  picture?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  address?: string;
  isAdmin?: boolean;
};

export type AuthState = {
  isLoading: boolean;
  error: Error | undefined;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: User | undefined;
  userConfig: CognitoUser | undefined;
};

export type UpdatableUserAttributes = {
  familyName?: string;
  givenName?: string;
  bio?: string;
  picture?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  address?: string;
};

export type AuthReducerAction =
  | {type: 'IS_LOGGING_IN'}
  | {type: 'LOGIN_SUCCESS'; user: User; userConfig: CognitoUser}
  | {type: 'LOGIN_FAILURE'; error: Error | undefined}
  | {type: 'LOGOUT_SUCCESS'}
  | {
      type: 'UPDATE_USER';
      updatedUserAttributes: UpdatableUserAttributes;
    };

const initialState = {
  isLoading: true,
  error: undefined,
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
  userConfig: undefined,
};

export function authReducer(
  state: AuthState,
  action: AuthReducerAction,
): AuthState {
  switch (action.type) {
    case 'IS_LOGGING_IN': {
      return initialState;
    }
    case 'LOGIN_SUCCESS': {
      return {
        isLoading: false,
        error: undefined,
        isAuthenticated: true,
        isAuthenticating: false,
        user: action.user,
        userConfig: action.userConfig,
      };
    }
    case 'LOGIN_FAILURE': {
      return {
        ...initialState,
        isLoading: false,
        error: action.error,
        isAuthenticating: false,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...initialState,
        isLoading: false,
        isAuthenticating: false,
      };
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        user: {
          ...(state.user as User),
          ...action.updatedUserAttributes,
        },
      };
    }

    default: {
      throw new Error(`Unsupported action type: ${JSON.stringify(action)}`);
    }
  }
}
