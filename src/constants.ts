/* eslint-disable import/no-mutable-exports */
import * as dev from './cdk-exports-dev.json';

export const TWITTER_HANDLE = 'bobbyhadz';
export const GITHUB_HANDLE = 'bobbyhadz';
export const FRONTEND_BASE_URL = 'https://frontend-url.com';

let REGION: string;
let API_BASE_URL: string;
let USER_POOL_CLIENT_ID: string;
let USER_POOL_ID: string;
let IDENTITY_POOL_ID: string;
let S3_BUCKET_NAME = '';

if (process.env.NODE_ENV === 'production') {
  API_BASE_URL = 'https://backend-api.com';
} else {
  const DEV_API_URL = dev['amplify-react-auth-dev'].apiUrl;
  const DEV_API_URL_WITHOUT_TRAILING_SLASH = DEV_API_URL.slice(
    0,
    DEV_API_URL.length - 1,
  );
  API_BASE_URL = DEV_API_URL_WITHOUT_TRAILING_SLASH;
  REGION = dev['amplify-react-auth-dev'].region;
  USER_POOL_CLIENT_ID = dev['amplify-react-auth-dev'].userPoolClientId;
  USER_POOL_ID = dev['amplify-react-auth-dev'].userPoolId;
  IDENTITY_POOL_ID = dev['amplify-react-auth-dev'].identityPoolId;
  S3_BUCKET_NAME = dev['amplify-react-auth-dev'].bucketName;
}
export const S3_BUCKET_URL = `https://${S3_BUCKET_NAME}.s3.amazonaws.com`;
export const MAX_FILE_SIZE_BYTES = 1000000;

export {
  REGION,
  API_BASE_URL,
  USER_POOL_CLIENT_ID,
  USER_POOL_ID,
  IDENTITY_POOL_ID,
};

export const JWT_LOCALSTORAGE_KEY = 'cognito_id_token';
export const IDENTITY_LOCALSTORAGE_KEY = 'cognito_identity_id';
export const TEMP_PWD_LOCALSTORAGE_KEY = 'auto_sign_in';

export enum ROUTE_PATHS {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  RESEND_REGISTRATION_LINK = '/auth/resend-registration-link',
  RESET_PASSWORD = '/auth/reset-password',
  REQUEST_PASSWORD_RESET = '/auth/request-password-reset',
  CONFIRM_RESET_PASSWORD = '/auth/confirm-reset-password',
  SETTINGS = '/settings',
  CONTACTS = '/contacts',
}

export enum IMAGE_PATHS {
  OPEN_GRAPH = '/images/global/og.webp',
  PAGE_NOT_FOUND = '/images/404/page-not-found.svg',
  MAN_DOOR = '/images/auth/login/man-door.svg',
  COMPLETE_PASSWORD_RESET = '/images/auth/complete-password-reset/man-shield.svg',
  WOMAN_SIGNING_UP = '/images/auth/register/woman-signing-up.svg',
  TEXT_FIELD = '/images/auth/request-password-reset/text-field.svg',
  WOMAN_CONFIRMING = '/images/auth/resend-registration-link/woman-confirming.svg',
  CONTACTS = '/images/contacts/contacts.svg',
  MAIL_ICON = '/images/contacts/mail-icon.svg',
}
