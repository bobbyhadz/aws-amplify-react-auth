import Auth, {CognitoUser} from '@aws-amplify/auth';
import {useAsync} from '@hooks/use-async';
import {useEffect, useRef} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

type FormInputs = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export function useChangePassword({
  userConfig,
  closePasswordModal,
}: {
  userConfig?: CognitoUser;
  closePasswordModal: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    watch,
    reset,
    errors: formErrors,
  } = useForm<FormInputs>();
  const newPasswordRef = useRef<string>('');
  newPasswordRef.current = watch('newPassword', '');

  const {status, error, isError, isLoading, isSuccess, run} = useAsync();

  const onSubmit: SubmitHandler<FormInputs> = ({oldPassword, newPassword}) => {
    run(changePassword());

    function changePassword() {
      return Auth.changePassword(userConfig, oldPassword, newPassword);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      closePasswordModal();
    }
  }, [closePasswordModal, isSuccess, reset]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    formErrors,
    status,
    error,
    isError,
    isLoading,
    isSuccess,
    newPasswordRef,
  };
}
