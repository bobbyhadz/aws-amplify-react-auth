import Auth from '@aws-amplify/auth';
import {useAsync} from '@hooks/use-async';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

type FormInputs = {email: string};

export function useRequestPasswordReset() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    reset,
    errors: formErrors,
  } = useForm<FormInputs>();
  const {error, status, isLoading, isSuccess, isError, run} = useAsync();

  const onSubmit: SubmitHandler<FormInputs> = ({email}) => {
    run(requestPasswordReset());

    function requestPasswordReset() {
      return Auth.forgotPassword(email) as Promise<Record<string, string>>;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    formErrors,
    isError,
    error,
    isSuccess,
    isLoading,
    status,
  };
}
