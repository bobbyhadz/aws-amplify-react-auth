import Link from 'next/link';
import {AnchorHTMLAttributes} from 'react';

type NextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  underline?: boolean;
  className?: string;
  href: string;
};

export const NextLink: React.FC<NextLinkProps> = ({
  children,
  underline = false,
  className = '',
  href,
  ...props
}) => {
  const border = underline
    ? 'border-b border-indigo-300 hover:border-indigo-400'
    : '';

  const isInternalLink = href?.startsWith('/');
  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} className={`${className} ${border}`}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
};
