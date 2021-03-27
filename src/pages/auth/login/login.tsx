import {Button, Input, Label} from '@components/forms';
import {Heading} from '@components/heading/heading';
import {EmailIcon, LockIcon} from '@components/icons/icons';
import {Flex} from '@components/layout';
import {LoadingInline} from '@components/loading-spinner';
import {NextLink} from '@components/next-link';
import {NotificationType, useNotification} from '@context/notification';
import {isValidEmail} from '@shared/index';
import {withAnonymous} from '@utils/route-hocs';
import {NextSeo} from 'next-seo';
import {useEffect} from 'react';
import {FRONTEND_BASE_URL, IMAGE_PATHS, ROUTE_PATHS} from 'src/constants';
import {useLogin} from './use-login';

const url = `${FRONTEND_BASE_URL}${ROUTE_PATHS.LOGIN}`;
const title = 'Login';
const description = 'Sign into your account';

export default withAnonymous(Login);

function Login() {
  const {
    handleSubmit,
    register,
    formErrors,
    isError,
    error,
    isLoading,
  } = useLogin();

  const {addNotification} = useNotification();

  useEffect(() => {
    if (isError && error) {
      addNotification({
        type: NotificationType.ERROR,
        title: error.message,
        message: 'Your request has failed.',
      });
    }
  }, [addNotification, error, isError]);

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
      <div className="flex flex-col py-12 mt-12 sm:px-6 lg:px-8">
        <div className="lg:flex">
          <div className="lg:flex-1">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="text-center">
                <div>
                  <Heading>Log in to your account</Heading>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="e.g. john-smith@example.com"
                      ref={register({
                        required: 'Email is required.',
                        validate: email =>
                          isValidEmail(email) || 'Email address is invalid.',
                      })}
                      error={formErrors.email?.message}
                      icon={<EmailIcon />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Must be at least 6 characters"
                      ref={register({
                        required: 'Password is required.',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters.',
                        },
                      })}
                      error={formErrors.password?.message}
                      icon={<LockIcon />}
                    />
                  </div>

                  <Flex className="items-center justify-between">
                    <NextLink
                      href={ROUTE_PATHS.REGISTER}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Do not have an account?
                    </NextLink>

                    <NextLink
                      href={ROUTE_PATHS.REQUEST_PASSWORD_RESET}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </NextLink>
                  </Flex>

                  <div>
                    <Button type="submit" disabled={!!isLoading} isFullWidth>
                      Log In {isLoading && <LoadingInline />}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:flex-1">
            <img
              className="hidden object-contain w-full h-56 lg:h-full lg:inline"
              src={IMAGE_PATHS.MAN_DOOR}
              alt="man opening door"
            />
          </div>
        </div>
      </div>
    </>
  );
}
