import {CognitoUser} from '@aws-amplify/auth';
import {Button, Input, Label, SelectMenu} from '@components/forms';
import {Flex} from '@components/layout';
import {LoadingInline} from '@components/loading-spinner';
import {Notification} from '@components/notification';
import type {UpdatableUserAttributes, User} from '@context/auth/auth-reducer';
import {HiHome, HiLocationMarker, HiPhone} from 'react-icons/hi';
import {useUpdatePersonalInformation} from './use-update-personal-information';

const countries = [
  {value: '', text: 'Select a Country'},
  {value: 'Austria', text: 'Austria'},
  {value: 'Australia', text: 'Australia'},
  {value: 'Argentina', text: 'Argentina'},
  {value: 'Belgium', text: 'Belgium'},
  {value: 'Bulgaria', text: 'Bulgaria'},
  {value: 'Germany', text: 'Germany'},
  {value: 'Greece', text: 'Greece'},
  {value: 'Georgia', text: 'Georgia'},
];

export function PersonalInformationForm({
  user,
  userConfig,
  updateUserAttributes,
}: {
  user?: User;
  userConfig?: CognitoUser;
  updateUserAttributes: (attributesToUpdate: UpdatableUserAttributes) => void;
}) {
  const {
    handleSubmit,
    register,
    isError,
    error,
    isSuccess,
    status,
    isLoading,
  } = useUpdatePersonalInformation({user, userConfig, updateUserAttributes});

  return (
    <>
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
          title="Personal Information updated successfully."
          description="Thank you for keeping your personal information up to date."
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-5">
                <Flex className="flex-col lg:flex-row lg:justify-between">
                  <Label htmlFor="phoneNumber">Phone number</Label>

                  <span className="text-sm leading-5 text-gray-500">
                    Must start with the country code - i.e. +49
                  </span>
                </Flex>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="e.g. +49123456789"
                  ref={register}
                  icon={<PhoneIcon />}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="country">Country / Region</Label>
                <SelectMenu id="country" name="country" ref={register}>
                  {countries.map(({value, text}) => (
                    <option key={value} value={value}>
                      {text}
                    </option>
                  ))}
                </SelectMenu>
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="e.g. Munich"
                  ref={register}
                  icon={<LocationIcon />}
                />
              </div>

              <div className="col-span-6">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="e.g. Saint Peters str. 123"
                  ref={register}
                  icon={<HomeIcon />}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <Button type="submit" className="inline-flex" disabled={isLoading}>
              Save {isLoading && <LoadingInline />}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

function PhoneIcon({className = 'w-5 h-5 text-gray-400'}) {
  return <HiPhone className={className} />;
}

function LocationIcon({className = 'w-5 h-5 text-gray-400'}) {
  return <HiLocationMarker className={className} />;
}

function HomeIcon({className = 'w-5 h-5 text-gray-400'}) {
  return <HiHome className={className} />;
}
