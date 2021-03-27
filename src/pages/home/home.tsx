import {NextLink} from '@components/next-link';
import {NextSeo} from 'next-seo';
import {FRONTEND_BASE_URL} from 'src/constants';

const url = FRONTEND_BASE_URL;
const title = 'Next.js Cognito Auth';
const description = 'Implementing Cognito Auth in Next.js using CDK for infra';

const Home: React.FC = () => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />

      <>
        <div className="relative">
          <main className="lg:relative">
            <div className="w-full pt-16 pb-20 mx-auto text-center max-w-7xl lg:py-48 lg:text-left">
              <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">
                    Amplify auth in react.js with{' '}
                  </span>
                  <span className="block text-purple-500 xl:inline">
                    AWS CDK
                  </span>
                </h1>
                <p className="max-w-md mx-auto mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                  Click on the profile icon in the right section of the navbar
                  to get started.
                </p>
                <p className="max-w-md mx-auto mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                  After you register you will get an email with an account
                  activation link, click on the link and then you can access
                  your profile from the profile icon in the navbar.
                </p>
                <p className="max-w-md mx-auto mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                  Made with{' '}
                  <span role="img" aria-label="heart">
                    🖤
                  </span>{' '}
                  by{' '}
                  <NextLink
                    href="https://twitter.com/bobbyhadz"
                    target="_blank"
                  >
                    <span className="text-indigo-400 underline">
                      Borislav Hadzhiev
                    </span>
                  </NextLink>
                </p>
              </div>
            </div>
            <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
              <img
                className="absolute inset-0 object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1601758174493-45d0a4d3e407?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt=""
              />
            </div>
          </main>
        </div>
      </>
    </>
  );
};

export default Home;
