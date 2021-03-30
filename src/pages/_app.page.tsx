import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
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
import {
  IDENTITY_POOL_ID,
  REGION,
  USER_POOL_CLIENT_ID,
  USER_POOL_ID,
} from 'src/constants';
import SEO from 'src/next-seo-config';
import 'stop-runaway-react-effects/hijack';

Auth.configure({
  mandatorySignIn: false,
  region: REGION,
  userPoolId: USER_POOL_ID,
  identityPoolId: IDENTITY_POOL_ID,
  userPoolWebClientId: USER_POOL_CLIENT_ID,
});

Amplify.configure({
  mandatorySignIn: false,
  region: REGION,
  userPoolId: USER_POOL_ID,
  identityPoolId: IDENTITY_POOL_ID,
  userPoolWebClientId: USER_POOL_CLIENT_ID,
});

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
