import {handleFacebookLogin, handleGoogleLogin} from '@utils/oauth-login';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {FRONTEND_BASE_URL} from 'src/constants';

const url = FRONTEND_BASE_URL;
const title = 'Next.js Cognito Auth';
const description = 'Implementing Cognito Auth in Next.js using CDK for infra';

const Home: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    if (
      router.query.error_description &&
      /already.found.an.entry.for.username.google/gi.test(
        router.query.error_description.toString(),
      )
    ) {
      handleGoogleLogin();
    } else if (
      router.query.error_description &&
      /already.found.an.entry.for.username.facebook/gi.test(
        router.query.error_description.toString(),
      )
    ) {
      handleFacebookLogin();
    }
  }, [router.isReady, router.query.error, router.query.error_description]);

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
                    A simple way to manage your{' '}
                  </span>
                  <span className="block text-indigo-600 xl:inline">
                    daily todos
                  </span>
                </h1>
                <p className="max-w-md mx-auto mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                  Start managing your todos with 3 simple states - todo, doing,
                  done. Separate them in 3 priority groups - urgent, important,
                  optional.
                </p>
                <p className="max-w-md mx-auto mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                  You can delete / update / postpone your todos, which are
                  separated by dates.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <a
                      href="/"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Live demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
              <img
                className="absolute inset-0 object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2102&amp;q=80"
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
