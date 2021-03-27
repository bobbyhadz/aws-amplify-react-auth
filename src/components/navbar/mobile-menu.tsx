type MobileMenuButtonProps = {
  onClick: () => void;
};

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      aria-label="toggle menu"
    >
      <span className="sr-only">Open main menu</span>
      {children}
    </button>
  );
};

type MobileMenuLinksProps = {
  className: string;
};

export const MobileMenuLinks: React.FC<MobileMenuLinksProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};
