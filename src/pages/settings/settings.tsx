/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {useAuth} from '@context/auth';
import {withAuthentication} from '@utils/route-hocs';
import {ReactNode} from 'react';
import {PersonalInformationForm} from './personal-section';
import {ProfileForm} from './profile-section';
import {SecurityTable} from './security-section';

export default withAuthentication(Settings);

function Settings() {
  const {
    state: {user, userConfig},
    updateUserAttributes,
  } = useAuth();

  return (
    <div className="bg-gray-100">
      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <SectionHeading>Profile</SectionHeading>
                <SectionSubheading>
                  This information will be displayed publicly so be careful what
                  you share.
                </SectionSubheading>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <ProfileForm
                user={user}
                userConfig={userConfig}
                updateUserAttributes={updateUserAttributes}
              />
            </div>
          </div>
        </div>

        <SectionSeparator />

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <SectionHeading>Personal Information</SectionHeading>
                <SectionSubheading>
                  Use a permanent address where you can receive mail.
                </SectionSubheading>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <PersonalInformationForm
                user={user}
                userConfig={userConfig}
                updateUserAttributes={updateUserAttributes}
              />
            </div>
          </div>
        </div>

        <SectionSeparator />

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <SectionHeading>Security and Privacy</SectionHeading>
                <SectionSubheading>
                  Improve your security with a strong password.
                </SectionSubheading>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <div className="mt-5 border-t border-gray-200">
                        <SecurityTable
                          email={user?.email}
                          userConfig={userConfig}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({children}: {children: ReactNode}) {
  return (
    <h3 className="text-lg font-medium leading-6 text-gray-900">{children}</h3>
  );
}

function SectionSubheading({children}: {children: ReactNode}) {
  return <p className="mt-1 text-sm text-gray-600">{children}</p>;
}

function SectionSeparator() {
  return (
    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200" />
      </div>
    </div>
  );
}
