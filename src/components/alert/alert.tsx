import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
} from '@components/icons/icons';
import {ReactElement, useState} from 'react';

type AlertProps = {
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
};

export const Alert: React.FC<AlertProps> = ({type, title, description}) => {
  const [isShown, setIsShown] = useState(true);

  const handleClose = () => {
    setIsShown(false);
  };

  let icon: ReactElement;
  let color = '';

  if (type === 'success') {
    icon = <SuccessIcon />;
    color = 'green';
  } else if (type === 'error') {
    icon = <ErrorIcon className="w-6 h-6 text-red-500" />;
    color = 'red';
  } else {
    icon = <InfoIcon />;
    color = 'blue';
  }

  if (!isShown) {
    return null;
  }

  return (
    <>
      <div className="px-4 py-6 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <div className={`p-4 rounded-md bg-${color}-50`}>
            <div className="flex">
              <div className="flex-shrink-0">{icon}</div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium text-${color}-800`}>
                  {title}
                </h3>
                {description && (
                  <div className={`mt-2 text-sm text-${color}-700`}>
                    <p>{description}</p>
                  </div>
                )}
              </div>
              <div className="pl-3 ml-auto">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    onClick={handleClose}
                    className={`inline-flex bg-${color}-50 rounded-md p-1.5 text-${color}-500 hover:bg-${color}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${color}-50 focus:ring-${color}-600`}
                  >
                    <span className="sr-only">Dismiss</span>
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
