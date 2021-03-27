import {Button, Input, Label} from '@components/forms';
import {EmailIcon} from '@components/icons/icons';
import {LoadingInline} from '@components/loading-spinner';
import {isValidEmail} from '@shared/index';
import type {UseChangeEmailResult} from './change-email-modal';

type ChangeEmailFormProps = Pick<
  UseChangeEmailResult,
  'handleSubmit' | 'register' | 'formErrors' | 'isLoading'
>;

export function ChangeEmailForm({
  handleSubmit,
  register,
  formErrors,
  isLoading,
}: ChangeEmailFormProps) {
  return (
    <div className="flex flex-col py-6 sm:px-6 lg:px-8">
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
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
            Change Email
            {isLoading && <LoadingInline />}
          </Button>
        </div>
      </form>
    </div>
  );
}
