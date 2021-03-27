type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Flex: React.FC<FlexProps> = ({
  children,
  className = '',
  ...rest
}) => (
  <div className={`flex ${className}`} {...rest}>
    {children}
  </div>
);
