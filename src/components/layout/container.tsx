type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  ...rest
}) => (
  <div className={`container ${className}`} {...rest}>
    {children}
  </div>
);
