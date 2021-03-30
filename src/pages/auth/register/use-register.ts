import Auth from '@aws-amplify/auth';
import {useAsync} from '@hooks/use-async';
import type {ISignUpResult} from 'amazon-cognito-identity-js';
import {useRef} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {amplifyConfigure, TEMP_PWD_LOCALSTORAGE_KEY} from 'src/constants';

amplifyConfigure();

type FormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  givenName: string;
  familyName: string;
};

export function useRegister() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    watch,
    reset,
    errors: formErrors,
  } = useForm<FormInputs>();
  const passwordRef = useRef<string>('');
  passwordRef.current = watch('password', '');
  const {
    error,
    status,
    isLoading,
    isSuccess,
    isError,
    run,
  } = useAsync<ISignUpResult>();

  const onSubmit: SubmitHandler<FormInputs> = async ({
    email,
    givenName,
    familyName,
    password,
  }) => {
    await run(handleRegister());

    async function handleRegister() {
      const result = await Auth.signUp({
        username: email.trim(),
        password,
        attributes: {
          given_name: givenName.trim(),
          family_name: familyName.trim(),
        },
      });

      localStorage.setItem(TEMP_PWD_LOCALSTORAGE_KEY, password);
      reset();

      return result;
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    formErrors,
    passwordRef,
    isError,
    error,
    status,
    isSuccess,
    isLoading,
  };
}
