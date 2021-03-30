import Auth from '@aws-amplify/auth';
import {useAsync} from '@hooks/use-async';
import {SubmitHandler, useForm} from 'react-hook-form';

type FormInputs = {
  email: string;
};

export function useResendRegistrationLink() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    reset,
    errors: formErrors,
  } = useForm<FormInputs>();
  const {status, error, isLoading, isSuccess, isError, run} = useAsync();

  const onSubmit: SubmitHandler<FormInputs> = async ({email}) => {
    await run(Auth.resendSignUp(email));
    reset();
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    formErrors,
    isError,
    error,
    isSuccess,
    isLoading,
    status,
  };
}
