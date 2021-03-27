export const Heading: React.FC = ({children}) => (
  <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-800 sm:text-4xl sm:leading-10">
    {children}
  </h1>
);

export const SubHeading: React.FC = ({children}) => (
  <h2 className="max-w-2xl mx-auto mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
    {children}
  </h2>
);
