import {LoadingGlobal} from '@components/loading-spinner';
import {NotificationType, useNotification} from '@context/notification';
import {withAnonymous} from '@utils/route-hocs';
import {useEffect} from 'react';
import {useCompleteRegistration} from './use-complete-registration';

export default withAnonymous(CompleteRegistration);

function CompleteRegistration() {
  const {isError, error, isLoading, isIdle} = useCompleteRegistration();

  const {addNotification} = useNotification();

  useEffect(() => {
    if (isError && error) {
      addNotification({
        type: NotificationType.ERROR,
        title: error.message,
        message: 'Your request has failed.',
      });
    }
  }, [addNotification, error, isError]);

  return <>{(isLoading || isIdle) && <LoadingGlobal />}</>;
}
