import {Button, Input, Label} from '@components/forms';
import {Heading, SubHeading} from '@components/heading/heading';
import {EmailIcon, LockIcon} from '@components/icons/icons';
import {LoadingInline} from '@components/loading-spinner';
import {NotificationType, useNotification} from '@context/notification';
import {isValidEmail} from '@shared/index';
import {withAnonymous} from '@utils/route-hocs';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {HiKey} from 'react-icons/hi';
import {FRONTEND_BASE_URL, IMAGE_PATHS, ROUTE_PATHS} from 'src/constants';
import {useCompletePasswordReset} from './use-complete-password-reset';

const url = `${FRONTEND_BASE_URL}${ROUTE_PATHS.CONFIRM_RESET_PASSWORD}`;
const title = 'Set your Password';
const description =
  'Enables you to set the password associated with your registration.';

export default withAnonymous(CompletePasswordReset);

function CompletePasswordReset() {
  const {
    handleSubmit,
    register,
    newPasswordRef,
    formErrors,
    isLoading,
    isError,
    error,
  } = useCompletePasswordReset();
  const router = useRouter();

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
          <div className="lg:pr-16 lg:flex-1">
            <div className="p-2 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="text-center">
                <div className="mt-4">
                  <Heading>Update your password</Heading>
                  <SubHeading>
                    After you update your password you will automatically get
                    logged in with the new credentials.
                  </SubHeading>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                      disabled={!!router.query.email}
                      error={formErrors.email?.message}
                      icon={<EmailIcon />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="code">Confirmation code</Label>
                    <Input
                      type="text"
                      id="code"
                      name="code"
                      placeholder="E.g. 214922"
                      ref={register({
                        required: 'Confirmation code is required.',
                      })}
                      disabled={!!router.query.code}
                      error={formErrors.code?.message}
                      icon={<KeyIcon />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPassword">Password</Label>
                    <Input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Must be at least 6 characters"
                      ref={register({
                        required: 'Password is required.',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 charact',
                        },
                      })}
                      error={formErrors.newPassword?.message}
                      icon={<LockIcon />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPasswordConfirm">Repeat Password</Label>
                    <Input
                      type="password"
                      id="newPasswordConfirm"
                      name="newPasswordConfirm"
                      placeholder="Must be at least 6 characters"
                      ref={register({
                        required: 'Password is required.',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters.',
                        },
                        validate: newPasswordConfirm =>
                          newPasswordConfirm === newPasswordRef.current ||
                          'The passwords do not match.',
                      })}
                      error={formErrors.newPasswordConfirm?.message}
                      icon={<LockIcon />}
                    />
                  </div>

                  <div>
                    <Button type="submit" isFullWidth disabled={!!isLoading}>
                      Update Password {isLoading && <LoadingInline />}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:flex-1">
            <img
              className="hidden object-contain w-full h-56 lg:h-full lg:inline"
              src={IMAGE_PATHS.COMPLETE_PASSWORD_RESET}
              alt="man with a shield"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function KeyIcon({className = 'w-5 h-5 text-gray-400'}) {
  return <HiKey className={className} />;
}
