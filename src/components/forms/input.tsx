import {ErrorIcon} from '@components/icons/icons';
import {Flex} from '@components/layout';
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
  icon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({error, icon, disabled, ...rest}, ref) => {
    const errorClasses = error
      ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 ring-2 ring-red-400 ring-opacity-50'
      : '';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    const iconClasses = icon ? 'pl-10' : '';

    return (
      <>
        <InputGroup>
          <InputLeftIcon>{icon}</InputLeftIcon>

          <input
            ref={ref}
            className={`${errorClasses} ${disabledClasses} ${iconClasses} block w-full py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            disabled={disabled}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
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

Input.displayName = 'Input';

export function InputGroup({children}: {children: ReactNode}): ReactElement {
  return <div className="relative mt-1 rounded-md shadow-sm">{children}</div>;
}

function InputLeftIcon({children}: {children: ReactNode}): ReactElement {
  return (
    <Flex className="absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
      {children}
    </Flex>
  );
}

export function InputRightIcon({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <Flex className="absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
      {children}
    </Flex>
  );
}

export function InputErrorMessage({
  errorMessage,
}: {
  errorMessage?: string;
}): ReactElement | null {
  return errorMessage ? (
    <p className="h-5 mt-1 text-sm text-red-600">{errorMessage}</p>
  ) : null;
}
