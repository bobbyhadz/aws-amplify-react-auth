/* eslint-disable camelcase */
import {CognitoUser} from '@aws-amplify/auth';
import {Avatar} from '@components/avatar';
import {Button, Input, Label, TextArea} from '@components/forms';
import {UserIcon} from '@components/icons/icons';
import {LoadingInline} from '@components/loading-spinner';
import type {UpdatableUserAttributes, User} from '@context/auth/auth-reducer';
import {NotificationType, useNotification} from '@context/notification';
import {useEffect} from 'react';
import {useUpdateProfile} from './use-update-profile';

export function ProfileForm({
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
    handleFileChange,
    handleClearPictureAttribute,
    register,
    fileError,
    fileName,
    formErrors,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useUpdateProfile({user, userConfig, updateUserAttributes});

  const {addNotification} = useNotification();

  useEffect(() => {
    if (isSuccess) {
      addNotification({
        type: NotificationType.SUCCESS,
        title: 'Thank you for keeping your profile up to date.',
      });
    }

    if (fileError) {
      addNotification({type: NotificationType.ERROR, title: fileError});
    }

    if (isError && error) {
      addNotification({type: NotificationType.ERROR, title: error.message});
    }
  }, [addNotification, error, fileError, isError, isSuccess]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="givenName">First name</Label>
              <Input
                type="text"
                id="givenName"
                name="givenName"
                placeholder="e.g. John"
                ref={register({
                  required: 'First name is required.',
                })}
                error={formErrors.givenName?.message}
                icon={<UserIcon />}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="familyName">Last name</Label>
              <Input
                type="text"
                id="familyName"
                name="familyName"
                placeholder="e.g. Smith"
                ref={register({
                  required: 'Last name is required.',
                })}
                error={formErrors.familyName?.message}
                icon={<UserIcon />}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">About</Label>
            <TextArea
              rows={3}
              id="bio"
              name="bio"
              placeholder="Who you are in fewer than 300 characters."
              ref={register}
              error={formErrors.bio?.message}
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700">
              Photo
            </span>
            <div className="flex items-center mt-2">
              <span className="inline-block w-12 h-12">
                <Avatar src={user?.picture || ''} />
              </span>

              <label
                htmlFor="picture"
                className="px-5 py-1 ml-4 bg-white border rounded-lg shadow cursor-pointer hover:bg-purple-600 hover:text-white"
              >
                <span className="mt-2 text-base leading-normal">
                  {fileName || 'Change'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  id="picture"
                  name="picture"
                  ref={register}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <Button
                onClick={handleClearPictureAttribute}
                size="sm"
                color="secondary"
                className="p-1 ml-4 border-4 border-transparent focus:outline-none"
                disabled={!user?.picture}
              >
                Delete
              </Button>
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
  );
}
