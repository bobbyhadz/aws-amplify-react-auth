type CenterProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Center: React.FC<CenterProps> = ({
  children,
  className = '',
  ...rest
}) => (
  <div className={`flex justify-center items-center ${className}`} {...rest}>
    {children}
  </div>
);
