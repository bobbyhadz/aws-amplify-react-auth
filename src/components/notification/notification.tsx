import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
} from '@components/icons/icons';
import {Flex} from '@components/layout';
import {ReactElement, useState} from 'react';

type NotificationProps = {
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
};

export const Notification: React.FC<NotificationProps> = ({
  type = 'info',
  title,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  let icon: ReactElement;

  if (type === 'success') {
    icon = <SuccessIcon />;
  } else if (type === 'error') {
    icon = <ErrorIcon className="w-6 h-6 text-red-500" />;
  } else {
    icon = <InfoIcon />;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <Flex className="fixed inset-0 z-20 items-end justify-center px-4 py-6 pointer-events-none sm:top-16 sm:right-16 sm:p-6 sm:items-start sm:justify-end">
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto">
        <div className="p-4">
          <Flex className="items-start">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-base font-medium leading-5 text-gray-900">
                {title}
              </p>
              {description && (
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {description}
                </p>
              )}
            </div>
            <Flex className="flex-shrink-0 ml-4">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex text-gray-400 transition duration-150 ease-in-out focus:outline-none focus:text-gray-500"
              >
                <CloseIcon />
              </button>
            </Flex>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};
