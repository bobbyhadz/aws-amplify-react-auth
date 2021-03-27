import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from 'react';

type RadioInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({disabled, ...rest}, ref) => {
    const disabledClasses = disabled ? 'opacity-50 cursror-not-allowed' : '';

    return (
      <input
        ref={ref}
        type="radio"
        className={`${disabledClasses} w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500`}
        disabled={disabled}
        {...rest}
      />
    );
  },
);

RadioInput.displayName = 'RadioInput';

type RadioLabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  htmlFor: string;
};

export const RadioLabel: React.FC<RadioLabelProps> = ({
  htmlFor,
  children,
  ...rest
}) => (
  <label
    htmlFor={htmlFor}
    className="block ml-1 text-base font-medium text-gray-700"
    {...rest}
  >
    {children}
  </label>
);
