import {useAuth} from '@context/auth';
import {useAsync} from '@hooks/use-async';
import {handleLogin} from '@utils/log-user-in';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';

type FormInputs = {
  email: string;
  password: string;
};

export function useLogin() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {register, handleSubmit, errors: formErrors} = useForm<FormInputs>();
  const {initializeUser} = useAuth();
  const router = useRouter();
  const {error, status, isLoading, isError, run} = useAsync();

  const onSubmit: SubmitHandler<FormInputs> = ({email, password}) => {
    run(handleLogin({email, password, router, initializeUser}));
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    formErrors,
    isError,
    error,
    status,
    isLoading,
  };
}
