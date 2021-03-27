import Link, {LinkProps} from 'next/link';
import {useRouter} from 'next/router';
import {Children, cloneElement, ReactElement} from 'react';

type ActiveLinkProps = {
  href: string;
  children: ReactElement;
  activeClassName: string;
  inactiveClassName?: string;
} & LinkProps;

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  activeClassName,
  inactiveClassName,
  ...props
}) => {
  const {asPath} = useRouter();
  const child = Children.only(children) as ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const childClassName: string = child.props?.className || '';

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const {href, as} = props;
  const className =
    // eslint-disable-next-line no-nested-ternary
    asPath === href || asPath === as
      ? `${childClassName} ${activeClassName}`.trim()
      : inactiveClassName
      ? `${childClassName} ${inactiveClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};
