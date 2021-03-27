import {SWRConfig} from 'swr';

interface Error {
  status?: number;
}

const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError: (error: Error, _key: string) => {
    console.log(
      '__________________ FROM SWR GLOBAL CONFIG 👈👈👈 ______________',
    );

    if (error.status !== 403 && error.status !== 404) {
      console.log('FROM SWR GLOBAL CONFIG 👈👈👈', error);
    }
  },
};

export const SWRConfigurationProvider: React.FC = ({children}) => (
  <SWRConfig value={swrConfig}>{children}</SWRConfig>
);
