type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Grid: React.FC<GridProps> = ({
  children,
  className = '',
  ...rest
}) => (
  <div className={`grid ${className}`} {...rest}>
    {children}
  </div>
);
