import {FaUserCircle} from 'react-icons/fa';
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiLockClosed,
  HiMail,
  HiOutlineTrash,
  HiOutlineX,
} from 'react-icons/hi';

export function InfoIcon({className = 'w-6 h-6 text-blue-600'}) {
  return <HiInformationCircle className={className} />;
}

export function SuccessIcon({className = 'w-6 h-6 text-green-400'}) {
  return <HiCheckCircle className={className} />;
}

export const CloseIcon = ({className = 'w-5 h-5'}) => (
  <HiOutlineX className={className} fill="currentColor" />
);

export const ErrorIcon = ({className = 'w-5 h-5 text-red-500'}) => (
  <HiExclamationCircle className={className} />
);

export const EmailIcon = ({className = 'w-5 h-5 text-gray-400'}) => (
  <HiMail className={className} fill="currentColor" />
);

export const UserIcon = ({className = 'w-5 h-5 text-gray-400'}) => (
  <FaUserCircle className={className} />
);

export const LockIcon = ({className = 'w-5 h-5 text-gray-400'}) => (
  <HiLockClosed className={className} />
);

export const TrashIcon = ({className = 'w-6 h-6'}) => (
  <HiOutlineTrash className={className} />
);
