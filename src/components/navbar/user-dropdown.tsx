type UserDropdownButtonProps = {
  onClick: () => void;
};

export const UserDropdownButton: React.FC<UserDropdownButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
    >
      <span className="sr-only">Open user menu</span>
      {children}
    </button>
  );
};

type UserDropdownLinksProps = {
  className: string;
};

export const UserDropdownLinks: React.FC<UserDropdownLinksProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};
