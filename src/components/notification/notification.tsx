import {CloseIcon, ErrorIcon} from '@components/icons';
import {ReactElement, useCallback, useEffect, useState} from 'react';
import {HiCheckCircle, HiInformationCircle} from 'react-icons/hi';

/*
 * NOTE: this component requires animation styles present in `index.css`
 */
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export type NotificationAttrs = {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  closeNotificationMs?: number;
};

type NotificationProps = NotificationAttrs & {
  closeNotification: (id: string) => void;
};

export const Notification = ({
  id,
  type,
  title,
  message,
  closeNotification,
  closeNotificationMs = 4000,
}: NotificationProps) => {
  const [shouldAnimateExit, setShouldAnimateExit] = useState(false);
  const [expirationBarWidth, setExpirationBarWidth] = useState(0);
  const [
    expirationIntervalId,
    setExpirationIntervalId,
  ] = useState<NodeJS.Timeout | null>(null);

  const handleStartTimer = useCallback(() => {
    const incrementBarWidthPercent = 0.5;
    const maxBarWidthPercent = 100;
    const intervalIterations = maxBarWidthPercent / incrementBarWidthPercent;
    const intervalTimerMs = closeNotificationMs / intervalIterations;

    const intervalId = setInterval(() => {
      setExpirationBarWidth(prev => {
        if (prev < maxBarWidthPercent) {
          const newExpirationBarWidth = prev + incrementBarWidthPercent;
          return newExpirationBarWidth;
        }

        clearInterval(intervalId);
        return prev;
      });
    }, intervalTimerMs);

    setExpirationIntervalId(intervalId);
  }, [closeNotificationMs]);

  const handlePauseTimer = useCallback(() => {
    if (expirationIntervalId) {
      clearInterval(expirationIntervalId);
    }
  }, [expirationIntervalId]);

  const handleCloseNotification = useCallback(() => {
    handlePauseTimer();
    setShouldAnimateExit(true);

    // delay removal of DOM element so exit animation gets shown
    setTimeout(() => {
      closeNotification(id);
    }, 400);
  }, [closeNotification, handlePauseTimer, id]);

  useEffect(() => {
    if (expirationBarWidth >= 100) {
      handleCloseNotification();
    }
  }, [expirationBarWidth, handleCloseNotification]);

  useEffect(() => {
    handleStartTimer();
  }, [handleStartTimer]);

  let icon: ReactElement;
  let expirationBarColor = '';

  if (type === NotificationType.SUCCESS) {
    icon = <SuccessIcon />;
    expirationBarColor = 'bg-green-400';
  } else if (type === NotificationType.ERROR) {
    icon = <ErrorIcon className="w-5 h-5 text-red-500" />;
    expirationBarColor = 'bg-red-500';
  } else {
    icon = <InfoIcon />;
    expirationBarColor = 'bg-blue-600';
  }

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg mb-5 notification-animate-left ${
        shouldAnimateExit ? 'notification-animate-right' : ''
      }`}
    >
      <div className="p-2">
        <div className="flex items-start">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-2 w-0 flex-1 pt-0.5">
            <p className="text-base font-medium leading-5 text-gray-900">
              {title}
            </p>
            {message && (
              <p className="mt-1 text-sm leading-5 text-gray-500">{message}</p>
            )}
          </div>
          <div className="flex flex-shrink-0 ml-2">
            <button
              type="button"
              onClick={handleCloseNotification}
              className="inline-flex text-gray-400 transition duration-150 ease-in-out focus:outline-none focus:text-gray-500"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`h-1 ${expirationBarColor}`}
        style={{width: `${expirationBarWidth}%`}}
      />
    </div>
  );
};

export function InfoIcon({className = 'w-6 h-6 text-blue-600'}) {
  return <HiInformationCircle className={className} />;
}

export function SuccessIcon({className = 'w-6 h-6 text-green-400'}) {
  return <HiCheckCircle className={className} />;
}
