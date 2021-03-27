import {Button, Input, Label} from '@components/forms';
import {Heading, SubHeading} from '@components/heading/heading';
import {EmailIcon} from '@components/icons/icons';
import {LoadingInline} from '@components/loading-spinner';
import {NotificationType, useNotification} from '@context/notification';
import {isValidEmail} from '@shared/index';
import {withAnonymous} from '@utils/route-hocs';
import {NextSeo} from 'next-seo';
import {useEffect} from 'react';
import {FRONTEND_BASE_URL, IMAGE_PATHS, ROUTE_PATHS} from 'src/constants';
import {useRequestPasswordReset} from './use-request-password-reset';

const url = `${FRONTEND_BASE_URL}${ROUTE_PATHS.RESET_PASSWORD}`;
const title = 'Reset password';
const description =
  'Enables you to change your password in case you forget it.';

export default withAnonymous(RequestPasswordReset);

function RequestPasswordReset() {
  const {
    register,
    handleSubmit,
    formErrors,
    isError,
    error,
    isSuccess,
    isLoading,
  } = useRequestPasswordReset();

  const {addNotification} = useNotification();

  useEffect(() => {
    if (isSuccess) {
      addNotification({
        type: NotificationType.SUCCESS,
        title:
          'Please click on the link sent to your email address, to complete the process.',
        message: 'Form submitted successfully.',
      });
    }

    if (isError && error) {
      addNotification({type: NotificationType.ERROR, title: error.message});
    }
  }, [addNotification, error, isError, isSuccess]);

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
                  <Heading>Reset your password</Heading>
                  <SubHeading>
                    You will receive an email with an activation link - click on
                    the link to complete the process.
                  </SubHeading>
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
                    <Button type="submit" disabled={!!isLoading} isFullWidth>
                      Reset Password {isLoading && <LoadingInline />}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:flex-1">
            <img
              className="hidden object-contain w-full h-56 lg:h-full lg:inline"
              src={IMAGE_PATHS.TEXT_FIELD}
              alt="text field"
            />
          </div>
        </div>
      </div>
    </>
  );
}
