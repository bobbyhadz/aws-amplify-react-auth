import {CognitoUser} from '@aws-amplify/auth';
import {Modal} from '@components/modal';
import {Notification} from '@components/notification';
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
    status,
    error,
    isError,
    isLoading,
    isSuccess,
    newPasswordRef,
  } = useChangePassword({userConfig, closePasswordModal});

  return (
    <>
      {isError && error && (
        <Notification type="error" title={error.message} key={status} />
      )}

      {isSuccess && (
        <Notification
          type="success"
          title="Password updated successfully, use the new password the next time you log in."
          description="Thank you for keeping your account secure."
        />
      )}

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
    </>
  );
}

export type UseChangePasswordResult = ReturnType<typeof useChangePassword>;

export function LockIconColored({className = 'w-6 h-6'}) {
  return <FcLock className={className} />;
}
