import Auth from '@aws-amplify/auth';
import {LoadingGlobal} from '@components/loading-spinner';
import {Notification} from '@components/notification';
import {useAsync} from '@hooks/use-async';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {ROUTE_PATHS} from 'src/constants';

export default function CompleteEmailChange() {
  const router = useRouter();
  const {
    error,
    status,
    isIdle,
    isLoading,
    isError,
    isSuccess,
    run,
  } = useAsync();

  useEffect(() => {
    if (router.isReady && !router.query.code) {
      router.push(ROUTE_PATHS.SETTINGS);
    }

    updateEmailAttribute();

    function updateEmailAttribute() {
      if (typeof router.query?.code === 'string') {
        run(Auth.verifyCurrentUserAttributeSubmit('email', router.query.code));
      }
    }
  }, [router, run]);

  useEffect(() => {
    if (isSuccess) {
      router.push(ROUTE_PATHS.SETTINGS);
    }
  }, [isSuccess, router]);

  return (
    <div className="flex flex-col py-12 mt-8 sm:px-6 lg:px-8">
      {isError && error && (
        <Notification
          type="error"
          title={error.message}
          description="Your request has failed."
          key={status}
        />
      )}
      {(isIdle || isLoading) && <LoadingGlobal />}
    </div>
  );
}
