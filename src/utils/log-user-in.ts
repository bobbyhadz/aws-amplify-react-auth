import Auth, {CognitoUser} from '@aws-amplify/auth';
import {NextRouter} from 'next/router';
import {TEMP_PWD_LOCALSTORAGE_KEY} from 'src/constants';

type LoginParams = {
  email: string;
  password: string;
  router: NextRouter;
  initializeUser: () => Promise<void>;
};

export async function handleLogin({
  email,
  password,
  router,
  initializeUser,
}: LoginParams) {
  localStorage.removeItem(TEMP_PWD_LOCALSTORAGE_KEY);

  const user = (await Auth.signIn(email, password)) as CognitoUser & {
    challengeName?: string;
    challengeParam: {
      requiredAttributes: string;
    };
  };

  if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    const {requiredAttributes} = user.challengeParam;
    const userAttributes: {
      // eslint-disable-next-line camelcase
      given_name?: string;
      // eslint-disable-next-line camelcase
      family_name?: string;
    } = {};
    if (requiredAttributes.includes('given_name')) {
      userAttributes.given_name = 'Test';
    }
    if (requiredAttributes.includes('family_name')) {
      userAttributes.family_name = 'User';
    }
    await Auth.completeNewPassword(user, password, userAttributes);
  }

  initializeUser();

  router.push('/');

  return user;
}
