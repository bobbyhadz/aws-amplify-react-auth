import {DetailedHTMLProps, LabelHTMLAttributes} from 'react';

type LabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  htmlFor: string;
};

export const Label: React.FC<LabelProps> = ({htmlFor, children, ...rest}) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium leading-5 text-gray-700"
    {...rest}
  >
    {children}
  </label>
);
