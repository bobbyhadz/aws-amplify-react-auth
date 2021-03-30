import {Footer} from '@components/footer';
import {Container} from '@components/layout';
import {Navbar} from '@components/navbar';
import {AuthProvider} from '@context/auth';
import {NotificationProvider} from '@context/notification';
import '@styles/tailwind.css';
import {DefaultSeo} from 'next-seo';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {StrictMode} from 'react';
import {amplifyConfigure} from 'src/constants';
import SEO from 'src/next-seo-config';
import 'stop-runaway-react-effects/hijack';

amplifyConfigure();

const navbarHeight = '172px';
const footerHeight = '232px';

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <StrictMode>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <div className="bg-gray-50">
        <NotificationProvider>
          <AuthProvider>
            <Navbar />
            <Container
              className="mx-auto"
              style={{
                minHeight: `calc(100vh - ${navbarHeight} - ${footerHeight})`,
              }}
            >
              <Component {...pageProps} />
            </Container>
          </AuthProvider>
        </NotificationProvider>
        <Footer />
      </div>
    </StrictMode>
  );
};

export default App;
