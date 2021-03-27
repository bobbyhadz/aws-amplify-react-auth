import {refreshJwt} from '@utils/refresh-jwt';
import axios from 'axios';
import {API_BASE_URL, JWT_LOCALSTORAGE_KEY} from 'src/constants';

export const axiosAuthInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    authorization: getUserToken() || null,
  },
  timeout: 5000,
});

axiosAuthInstance.interceptors.request.use(
  // Check JWT's validity before request is sent
  async function onFulfilled(config) {
    const {idToken} = await refreshJwt();
    // eslint-disable-next-line no-param-reassign
    ((config.headers as unknown) as Record<
      string,
      unknown
    >).authorization = idToken;
    return config;
  },
  // Reject if the call to Amplify errors out
  function onRejected(error) {
    console.log('Error: ', error);
    return Promise.reject(error);
  },
);

function getUserToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  }
  return null;
}
