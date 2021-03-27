import {Button, Input, Label} from '@components/forms';
import {LockIcon} from '@components/icons/icons';
import {LoadingInline} from '@components/loading-spinner';
import type {UseChangePasswordResult} from './change-password-modal';

type ChangePasswordFormProps = Pick<
  UseChangePasswordResult,
  'register' | 'handleSubmit' | 'formErrors' | 'isLoading' | 'newPasswordRef'
>;

export const ChangePasswordForm = ({
  register,
  handleSubmit,
  formErrors,
  isLoading,
  newPasswordRef,
}: ChangePasswordFormProps) => (
  <div className="flex flex-col py-6 sm:px-6 lg:px-8">
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="oldPassword">Old Password</Label>
        <Input
          type="password"
          id="oldPassword"
          name="oldPassword"
          placeholder="Must be at least 6 characters"
          ref={register({
            required: 'Old Password is required.',
            minLength: {
              value: 6,
              message: 'Old Password must be at least 6 characters.',
            },
          })}
          error={formErrors.oldPassword?.message}
          icon={<LockIcon />}
        />
      </div>
      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Must be at least 6 characters"
          ref={register({
            required: 'New Password is required.',
            minLength: {
              value: 6,
              message: 'New Password must be at least 6 characters.',
            },
          })}
          error={formErrors.newPassword?.message}
          icon={<LockIcon />}
        />
      </div>
      <div>
        <Label htmlFor="newPasswordConfirm">Repeat your New Password</Label>
        <Input
          type="password"
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          placeholder="Must be at least 6 characters"
          ref={register({
            required: 'Password confirmation is required.',
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
        <Button type="submit" disabled={!!isLoading} isFullWidth>
          Change Password {isLoading && <LoadingInline />}
        </Button>
      </div>
    </form>
  </div>
);
