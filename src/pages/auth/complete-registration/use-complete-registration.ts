import Auth from '@aws-amplify/auth';
import {useAuth} from '@context/auth';
import {useAsync} from '@hooks/use-async';
import {handleLogin} from '@utils/log-user-in';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {ROUTE_PATHS, TEMP_PWD_LOCALSTORAGE_KEY} from 'src/constants';

export function useCompleteRegistration() {
  const {initializeUser} = useAuth();
  const router = useRouter();
  const {error, status, isLoading, isIdle, isError, run} = useAsync();

  useEffect(() => {
    const hasQueryParams = router.query.code && router.query.email;
    if (router.isReady && !hasQueryParams) {
      router.push(ROUTE_PATHS.RESEND_REGISTRATION_LINK);
    }

    completeRegistration();

    async function completeRegistration() {
      if (
        typeof router.query?.email === 'string' &&
        typeof router.query?.code === 'string'
      ) {
        await run(confirmRegistrationAndLogUserIn());
      }

      async function confirmRegistrationAndLogUserIn() {
        await confirmRegistration();

        logUserIn();
      }

      function confirmRegistration() {
        return Auth.confirmSignUp(
          String(router.query.email),
          String(router.query.code),
        );
      }

      function logUserIn() {
        const password = localStorage.getItem(TEMP_PWD_LOCALSTORAGE_KEY);
        if (password) {
          handleLogin({
            email: String(router.query.email),
            password,
            router,
            initializeUser,
          });
        } else {
          router.push(ROUTE_PATHS.LOGIN);
        }
      }
    }
  }, [router, run, initializeUser]);

  return {
    isError,
    error,
    isLoading,
    isIdle,
    status,
  };
}
