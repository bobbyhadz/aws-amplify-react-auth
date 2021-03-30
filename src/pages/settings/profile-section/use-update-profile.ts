/* eslint-disable camelcase */
import Auth, {CognitoUser} from '@aws-amplify/auth';
import type {CognitoUserAttributes} from '@context/auth';
import type {UpdatableUserAttributes, User} from '@context/auth/auth-reducer';
import {useAsync} from '@hooks/use-async';
import {usePrevious} from '@hooks/use-previous';
import {useCallback, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {uploadToS3} from './upload-file';
import {useFileChange} from './use-file-change';

type ProfileFormInputs = {
  givenName: string;
  familyName: string;
  bio: string;
  picture: string;
};

export function useUpdateProfile({
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
    errors: formErrors,
    setValue,
  } = useForm<ProfileFormInputs>();
  const {
    error,
    status,
    isLoading,
    isSuccess,
    isError,
    run,
    setError,
  } = useAsync();

  const setFormValues = useCallback(() => {
    setValue('bio', user?.bio);
    setValue('givenName', user?.givenName);
    setValue('familyName', user?.familyName);
  }, [setValue, user?.bio, user?.familyName, user?.givenName]);

  useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  const prevIsError = usePrevious(isError);
  useEffect(() => {
    if (isError && !prevIsError) {
      setFormValues();
    }
  }, [isError, prevIsError, setFormValues]);

  const {
    fileError,
    fileName,
    fileContents,
    fileType,
    fileDispatch,
    handleFileChange,
  } = useFileChange();

  const onSubmit: SubmitHandler<ProfileFormInputs> = ({
    givenName,
    familyName,
    bio,
  }) => {
    run(uploadToS3AndUpdateProfileAttributes());

    async function uploadToS3AndUpdateProfileAttributes() {
      let filePath = '';
      if (fileContents && fileType) {
        filePath = await uploadToS3({fileType, fileContents});
        fileDispatch({type: 'RESET_FILE_STATE'});
      }

      const result = await saveProfileAttributes(filePath);
      if (filePath) {
        updateUserAttributes({picture: filePath, givenName, familyName, bio});
      } else {
        updateUserAttributes({givenName, familyName, bio});
      }

      return result;
    }

    async function saveProfileAttributes(filePath?: string) {
      type ProfileAttributes = Pick<
        CognitoUserAttributes,
        'given_name' | 'family_name' | 'custom:bio' | 'picture'
      >;
      const profileAttributes: ProfileAttributes = {
        given_name: givenName,
        family_name: familyName,
        'custom:bio': bio,
      };

      if (filePath) {
        profileAttributes.picture = filePath;
      }

      return Auth.updateUserAttributes(userConfig, profileAttributes);
    }
  };

  const handleClearPictureAttribute = async () => {
    try {
      await Auth.updateUserAttributes(userConfig, {picture: ''});

      updateUserAttributes({picture: ''});
    } catch (err) {
      if (typeof err === 'object' && 'message' in err) {
        setError(err);
      } else {
        setError(new Error(err));
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleFileChange,
    handleClearPictureAttribute,
    fileError,
    fileName,
    formErrors,
    isLoading,
    error,
    isError,
    isSuccess,
    status,
  };
}
