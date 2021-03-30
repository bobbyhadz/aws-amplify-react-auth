import {CognitoUser} from '@aws-amplify/auth';
import {Button} from '@components/forms';
import {LockIcon} from '@components/icons/icons';
import {useCallback, useState} from 'react';
import {ChangeEmailModal} from './change-email';
import {ChangePasswordModal} from './change-password';

export const SecurityTable = ({
  email,
  userConfig,
}: {
  email?: string;
  userConfig?: CognitoUser;
}) => {
  const [showsPasswordModal, setShowsPasswordModal] = useState(false);
  const closePasswordModal = useCallback(
    () => setShowsPasswordModal(false),
    [],
  );

  const [showsEmailModal, setShowsEmailModal] = useState(false);
  const closeEmailModal = useCallback(() => setShowsEmailModal(false), []);

  return (
    <dl className="divide-y divide-gray-200">
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">Email address</dt>
        <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span className="flex-grow">{email}</span>
          <span className="flex-shrink-0 ml-4">
            <Button color="secondary" onClick={() => setShowsEmailModal(true)}>
              Update
            </Button>
            <ChangeEmailModal
              userConfig={userConfig}
              showsEmailModal={showsEmailModal}
              closeEmailModal={closeEmailModal}
            />
          </span>
        </dd>
      </div>

      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">Password</dt>
        <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span className="flex-grow">
            <LockIcon className="inline-block w-5 h-5 text-gray-400" />
            <LockIcon className="inline-block w-5 h-5 text-gray-400" />
            <LockIcon className="inline-block w-5 h-5 text-gray-400" />
          </span>
          <span className="flex-shrink-0 ml-4">
            <Button
              color="secondary"
              onClick={() => setShowsPasswordModal(true)}
            >
              Update
            </Button>
            <ChangePasswordModal
              userConfig={userConfig}
              showsPasswordModal={showsPasswordModal}
              closePasswordModal={closePasswordModal}
            />
          </span>
        </dd>
      </div>
    </dl>
  );
};
