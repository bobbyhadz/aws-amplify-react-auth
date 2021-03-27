import Auth, {CognitoUser} from '@aws-amplify/auth';
import type {UpdatableUserAttributes, User} from '@context/auth/auth-reducer';
import {useAsync} from '@hooks/use-async';
import {usePrevious} from '@hooks/use-previous';
import {useCallback, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

type PersonalInformationInputs = {
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
};

export function useUpdatePersonalInformation({
  user,
  userConfig,
  updateUserAttributes,
}: {
  user?: User;
  userConfig?: CognitoUser;
  updateUserAttributes: (attributesToUpdate: UpdatableUserAttributes) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<PersonalInformationInputs>();
  const {error, status, isLoading, isSuccess, isError, run} = useAsync();

  const setFormValues = useCallback(() => {
    setValue('phoneNumber', user?.phoneNumber);
    setValue('country', user?.country);
    setValue('city', user?.city);
    setValue('address', user?.address);
  }, [setValue, user?.address, user?.city, user?.country, user?.phoneNumber]);

  useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  const prevIsError = usePrevious(isError);
  useEffect(() => {
    if (isError && !prevIsError) {
      setFormValues();
    }
  }, [isError, prevIsError, setFormValues]);

  const onSubmit: SubmitHandler<PersonalInformationInputs> = ({
    phoneNumber,
    address,
    city,
    country,
  }) => {
    run(saveProfileAttributes());

    async function saveProfileAttributes() {
      const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, '');
      const result = await Auth.updateUserAttributes(userConfig, {
        phone_number: phoneNumberWithoutSpaces,
        'custom:country': country,
        'custom:city': city,
        address,
      });

      updateUserAttributes({
        phoneNumber: phoneNumberWithoutSpaces,
        country,
        city,
        address,
      });

      return result;
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    isError,
    error,
    isSuccess,
    status,
    isLoading,
  };
}
