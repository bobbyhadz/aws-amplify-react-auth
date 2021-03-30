import Auth from '@aws-amplify/auth';
import {useAuth} from '@context/auth';
import {useAsync} from '@hooks/use-async';
import {handleLogin} from '@utils/log-user-in';
import {useRouter} from 'next/router';
import {useEffect, useRef} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ROUTE_PATHS} from 'src/constants';

type FormInputs = {
  email: string;
  code: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export function useCompletePasswordReset() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    errors: formErrors,
  } = useForm<FormInputs>();
  const newPasswordRef = useRef<string>('');
  newPasswordRef.current = watch('newPassword', '');

  const {initializeUser} = useAuth();
  const {status, error, isLoading, isError, run} = useAsync();
  const router = useRouter();

  useEffect(() => {
    const hasQueryParameters = router.query.code && router.query.email;

    if (router.isReady) {
      if (!hasQueryParameters) {
        router.push(ROUTE_PATHS.REQUEST_PASSWORD_RESET);
      } else {
        setValue('code', router.query.code);
        setValue('email', router.query.email);
      }
    }
  }, [router, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = ({newPassword: password}) => {
    run(updatePassword());

    async function updatePassword() {
      const email = String(router.query.email);
      const code = String(router.query.code);

      await Auth.forgotPasswordSubmit(email, code, password);

      await handleLogin({
        email,
        password,
        router,
        initializeUser,
      });
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    newPasswordRef,
    formErrors,
    isLoading,
    isError,
    error,
    status,
  };
}
