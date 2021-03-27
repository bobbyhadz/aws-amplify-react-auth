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
import {useResendRegistrationLink} from './use-resend-registration-link';

const url = `${FRONTEND_BASE_URL}${ROUTE_PATHS.RESEND_REGISTRATION_LINK}`;
const title = 'Resend activation link';
const description =
  'Enables you to resend the registration activation link to your email address.';

export default withAnonymous(ResendRegistrationLink);

function ResendRegistrationLink() {
  const {
    handleSubmit,
    register,
    formErrors,
    isError,
    error,
    isSuccess,
    isLoading,
  } = useResendRegistrationLink();
  const {addNotification} = useNotification();

  useEffect(() => {
    if (isSuccess) {
      addNotification({
        type: NotificationType.SUCCESS,
        title:
          'Please click on the link, sent to your email address to activate your account.',
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
          <div className="lg:flex-1">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
              <div className="p-2 text-center">
                <div>
                  <Heading>Resend accont activation link</Heading>
                  <SubHeading>
                    After you fill in the form, you will receive an email with
                    an activation link - click on the link to complete the
                    process.
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
                      Resend link {isLoading && <LoadingInline />}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:flex-1">
            <img
              className="hidden object-contain w-full h-56 lg:h-full lg:inline"
              src={IMAGE_PATHS.WOMAN_CONFIRMING}
              alt="woman confirming"
            />
          </div>
        </div>
      </div>
    </>
  );
}
