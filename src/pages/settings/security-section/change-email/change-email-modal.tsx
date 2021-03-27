import {CognitoUser} from '@aws-amplify/auth';
import {Modal} from '@components/modal';
import {Notification} from '@components/notification';
import {FcFeedback} from 'react-icons/fc';
import {ChangeEmailForm} from './change-email-form';
import {useChangeEmail} from './use-change-email';

type ChangeEmailProps = {
  userConfig?: CognitoUser;
  showsEmailModal: boolean;
  closeEmailModal: () => void;
};

export function ChangeEmailModal({
  userConfig,
  showsEmailModal,
  closeEmailModal,
}: ChangeEmailProps) {
  const {
    register,
    handleSubmit,
    formErrors,
    error,
    status,
    isLoading,
    isSuccess,
    isError,
  } = useChangeEmail({userConfig, closeEmailModal});

  return (
    <>
      {isError && error && (
        <Notification type="error" title={error.message} key={status} />
      )}

      {isSuccess && (
        <Notification
          type="success"
          title="Please click on the activation link, sent to your new email address."
          description="To complete the email change - verify your new email address by clicking on the activation link."
          key={status}
        />
      )}

      <Modal
        title="Change Email"
        description="After changing your email address you will receive an activation link, please click on it to complete the process."
        showsModal={showsEmailModal}
        closeModal={closeEmailModal}
        icon={<FeedbackIcon className="w-12 h-12" />}
        body={
          <ChangeEmailForm
            handleSubmit={handleSubmit}
            register={register}
            formErrors={formErrors}
            isLoading={isLoading}
          />
        }
      />
    </>
  );
}

export type UseChangeEmailResult = ReturnType<typeof useChangeEmail>;

function FeedbackIcon({className = 'w-6 h-6'}) {
  return <FcFeedback className={className} />;
}
