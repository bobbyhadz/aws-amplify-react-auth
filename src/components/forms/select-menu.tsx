import {DetailedHTMLProps, forwardRef, InputHTMLAttributes} from 'react';

type SelectMenuProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  hasError?: boolean;
};

export const SelectMenu = forwardRef<HTMLSelectElement, SelectMenuProps>(
  ({hasError, disabled, ...rest}, ref) => {
    const errorClasses = hasError
      ? 'border-red-300 placeholder-red-300 text-red-900 focus:border-red-300 ring-2 ring-red-400 ring-opacity-50'
      : '';

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
      <select
        ref={ref}
        disabled={disabled}
        className={`${errorClasses} ${disabledClasses} block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        {...rest}
      />
    );
  },
);

SelectMenu.displayName = 'SelectMenu';

// TODO: test if it navigates to the value when I press the first letter of the value
// TODO: test disabled/ error styling of Select, by making it required.

/*
* Usage:
  <SomeContainerConstrainingWidth>
    <Select>
      <option>Germany</option>
      <option>Belgium</option>
      <option>Austria</option>
    </Select>
  </SomeContainerConstrainingWidth>
*/
