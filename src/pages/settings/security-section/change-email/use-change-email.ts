import Auth, {CognitoUser} from '@aws-amplify/auth';
import {useAsync} from '@hooks/use-async';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

type FormInputs = {
  email: string;
};

export function useChangeEmail({
  userConfig,
  closeEmailModal,
}: {
  userConfig?: CognitoUser;
  closeEmailModal: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    reset,
    errors: formErrors,
  } = useForm<FormInputs>();
  const {error, status, isLoading, isSuccess, isError, run} = useAsync();

  const onSubmit: SubmitHandler<FormInputs> = ({email}) => {
    run(initiateEmailChange());

    function initiateEmailChange() {
      return Auth.updateUserAttributes(userConfig, {
        email,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      closeEmailModal();
    }
  }, [closeEmailModal, isSuccess, reset]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    formErrors,
    error,
    status,
    isLoading,
    isSuccess,
    isError,
  };
}
