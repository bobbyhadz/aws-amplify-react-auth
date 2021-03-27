type TagProps = {
  className?: string;
};

export const Tag: React.FC<TagProps> = ({className = '', children}) => {
  return (
    <span
      className={`${className} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800`}
    >
      {children}
    </span>
  );
};
