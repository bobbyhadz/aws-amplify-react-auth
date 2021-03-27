import {LoadingGlobal} from '@components/loading-spinner';
import {Notification} from '@components/notification';
import {withAnonymous} from '@utils/route-hocs';
import {useCompleteRegistration} from './use-complete-registration';

export default withAnonymous(CompleteRegistration);

function CompleteRegistration() {
  const {isError, error, isLoading, isIdle, status} = useCompleteRegistration();

  return (
    <>
      {isError && error && (
        <Notification
          type="error"
          title={error.message}
          description="Your request has failed."
          key={status}
        />
      )}

      {(isLoading || isIdle) && <LoadingGlobal />}
    </>
  );
}
