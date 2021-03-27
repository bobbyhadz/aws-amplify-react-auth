import {Button, Input, Label} from '@components/forms';
import {Heading, SubHeading} from '@components/heading/heading';
import {EmailIcon, LockIcon, UserIcon} from '@components/icons/icons';
import {Flex} from '@components/layout';
import {LoadingInline} from '@components/loading-spinner';
import {NextLink} from '@components/next-link';
import {Notification} from '@components/notification';
import {isValidEmail} from '@shared/index';
import {withAnonymous} from '@utils/route-hocs';
import {NextSeo} from 'next-seo';
import {FRONTEND_BASE_URL, IMAGE_PATHS, ROUTE_PATHS} from 'src/constants';
import {useRegister} from './use-register';

const url = `${FRONTEND_BASE_URL}${ROUTE_PATHS.REGISTER}`;
const title = 'Register';
const description = 'Register for an account';

export default withAnonymous(Register);

function Register() {
  const {
    handleSubmit,
    register,
    formErrors,
    passwordRef,
    isError,
    error,
    status,
    isSuccess,
    isLoading,
  } = useRegister();

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
      <Flex className="flex-col py-12 mt-4 sm:px-6 lg:px-8">
        {isError && error && (
          <Notification
            type="error"
            title={error.message}
            description="Your request has failed."
            key={status}
          />
        )}

        {isSuccess && (
          <Notification
            type="success"
            title="Please click on the activation link, sent to your email address to complete the registration."
            description="Form submitted successfully."
            key={status}
          />
        )}

        <div className="lg:flex">
          <div className="lg:flex-1">
            <div className="p-2 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="text-center">
                <div>
                  <Heading>Register for an account</Heading>
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
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
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

                  <div>
                    <Label htmlFor="confirmPassword">
                      Repeat your Password
                    </Label>

                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Must be at least 6 characters"
                      ref={register({
                        required: 'Password confirmation is required.',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters.',
                        },
                        validate: confirmPassword =>
                          confirmPassword === passwordRef.current ||
                          'The passwords do not match.',
                      })}
                      error={formErrors.confirmPassword?.message}
                      icon={<LockIcon />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="givenName">First Name</Label>
                    <Input
                      type="text"
                      id="givenName"
                      name="givenName"
                      placeholder="e.g. John"
                      ref={register({required: 'First Name is required.'})}
                      error={formErrors.givenName?.message}
                      icon={<UserIcon />}
                    />
                  </div>

                  <div>
                    <Label htmlFor="familyName">Last Name</Label>
                    <Input
                      type="text"
                      id="familyName"
                      name="familyName"
                      placeholder="e.g. Smith"
                      ref={register({required: 'Last Name is required.'})}
                      error={formErrors.familyName?.message}
                      icon={<UserIcon />}
                    />
                  </div>

                  <Flex className="items-center justify-between">
                    <NextLink
                      href={ROUTE_PATHS.RESEND_REGISTRATION_LINK}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Resend activation link
                    </NextLink>
                    <NextLink
                      href={ROUTE_PATHS.LOGIN}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Already have an account?
                    </NextLink>
                  </Flex>

                  <div>
                    <Button type="submit" isFullWidth disabled={!!isLoading}>
                      Register {isLoading && <LoadingInline />}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:flex-1">
            <img
              className="hidden object-contain w-full h-56 lg:h-full lg:inline"
              src={IMAGE_PATHS.WOMAN_SIGNING_UP}
              alt="woman signing up"
            />
          </div>
        </div>
      </Flex>
    </>
  );
}
