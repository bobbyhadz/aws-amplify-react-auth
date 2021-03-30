import {CognitoUser} from '@aws-amplify/auth';
import {Modal} from '@components/modal';
import {NotificationType, useNotification} from '@context/notification';
import {useEffect} from 'react';
import {FcLock} from 'react-icons/fc';
import {ChangePasswordForm} from './change-password-form';
import {useChangePassword} from './use-change-password';

type ChangePasswordModalProps = {
  userConfig?: CognitoUser;
  showsPasswordModal: boolean;
  closePasswordModal: () => void;
};

export function ChangePasswordModal({
  userConfig,
  showsPasswordModal,
  closePasswordModal,
}: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    formErrors,
    error,
    isError,
    isLoading,
    isSuccess,
    newPasswordRef,
  } = useChangePassword({userConfig, closePasswordModal});
  const {addNotification} = useNotification();

  useEffect(() => {
    if (isSuccess) {
      addNotification({
        type: NotificationType.SUCCESS,
        title:
          'Password updated successfully, use the new password the next time you log in.',
        message: 'Thank you for keeping your account secure.',
      });
    }

    if (isError && error) {
      addNotification({type: NotificationType.ERROR, title: error.message});
    }
  }, [addNotification, error, isError, isSuccess]);

  return (
    <Modal
      title="Change Password"
      description="Pick a strong password of minimum 6 characters, that you haven't used on any other website."
      showsModal={showsPasswordModal}
      closeModal={closePasswordModal}
      icon={<LockIconColored className="w-12 h-12" />}
      body={
        <ChangePasswordForm
          register={register}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
          isLoading={isLoading}
          newPasswordRef={newPasswordRef}
        />
      }
    />
  );
}

export type UseChangePasswordResult = ReturnType<typeof useChangePassword>;

export function LockIconColored({className = 'w-6 h-6'}) {
  return <FcLock className={className} />;
}
