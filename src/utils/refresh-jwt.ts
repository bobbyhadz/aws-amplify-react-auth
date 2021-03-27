import Auth from '@aws-amplify/auth';
import {IDENTITY_LOCALSTORAGE_KEY, JWT_LOCALSTORAGE_KEY} from 'src/constants';

/**
 * Refreshes the JWT token if it has expired.
 *
 * returns a CognitoUserSession object which contains JWT -
 *  accessToken, idToken, and refreshToken.
 *
 * this method will automatically refresh the accessToken and idToken if
 * tokens are expired and a valid refreshToken is present.
 */
export async function refreshJwt() {
  try {
    const session = ((await Auth.currentSession()) as unknown) as {
      idToken: {jwtToken: string};
    };

    localStorage.setItem(JWT_LOCALSTORAGE_KEY, session.idToken.jwtToken);
    return {idToken: session.idToken.jwtToken};
  } catch (err) {
    localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
    localStorage.removeItem(IDENTITY_LOCALSTORAGE_KEY);
    return {idToken: null};
  }
}

export function getUserJwtToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  }
  return null;
}
