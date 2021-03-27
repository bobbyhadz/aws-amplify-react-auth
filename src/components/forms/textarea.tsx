import {ErrorIcon} from '@components/icons/icons';
import {DetailedHTMLProps, forwardRef, TextareaHTMLAttributes} from 'react';
import {InputErrorMessage, InputGroup, InputRightIcon} from './input';

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({error, ...rest}, ref) => {
    const errorClasses = error
      ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 ring-2 ring-red-400 ring-opacity-50'
      : '';

    return (
      <>
        <InputGroup>
          <textarea
            ref={ref}
            className={`${errorClasses} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md`}
            {...rest}
          />
          {error && (
            <InputRightIcon>
              <ErrorIcon />
            </InputRightIcon>
          )}
        </InputGroup>

        <InputErrorMessage errorMessage={error} />
      </>
    );
  },
);

TextArea.displayName = 'TextArea';
