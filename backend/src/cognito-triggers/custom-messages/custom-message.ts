type CustomMessageProps = {
  codeParameter: string;
  userAttributes: {
    // eslint-disable-next-line camelcase
    given_name: string;
    // eslint-disable-next-line camelcase
    family_name: string;
    email: string;
  };
  usernameParameter: string;
};

// Merge the interface with the class
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CustomMessage extends CustomMessageProps {}

type CustomMessageReturnValue = {
  emailSubject: string;
  emailMessage: string;
};

class CustomMessage {
  FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
  FRONTEND_LINKS: {
    SEND_CODE_POST_SIGN_UP: string;
    SEND_CODE_FORGOT_PASSWORD: string;
    SEND_CODE_VERIFY_NEW_EMAIL: string;
    SEND_TEMPORARY_PASSWORD: string;
    RESEND_CONFIRMATION_CODE: string;
  };

  constructor(kwargs: CustomMessageProps) {
    Object.assign(this, kwargs);

    this.FRONTEND_LINKS = {
      SEND_CODE_POST_SIGN_UP: `${this.FRONTEND_BASE_URL}/auth/complete-registration?code=${this.codeParameter}&email=${this.userAttributes.email}`,
      SEND_CODE_FORGOT_PASSWORD: `${this.FRONTEND_BASE_URL}/auth/complete-password-reset?code=${this.codeParameter}&email=${this.userAttributes.email}`,
      SEND_CODE_VERIFY_NEW_EMAIL: `${this.FRONTEND_BASE_URL}/auth/complete-password-reset?code=${this.codeParameter}&email=${this.userAttributes.email}`,
      SEND_TEMPORARY_PASSWORD: `${this.FRONTEND_BASE_URL}/auth/login`,
      RESEND_CONFIRMATION_CODE: `${this.FRONTEND_BASE_URL}/auth/complete-registration?code=${this.codeParameter}&email=${this.userAttributes.email}`,
    };
  }

  sendCodePostSignUp(): CustomMessageReturnValue {
    return {
      emailSubject: `Validate your account for ${
        this.FRONTEND_BASE_URL
      } | ${new Date().toLocaleString()}`,
      emailMessage: `Hi <b>${this.userAttributes.given_name} ${this.userAttributes.family_name}</b>!<br>Thank you for signing up.
      <br />
      Please click on the link to activate your account: <a href="${this.FRONTEND_LINKS.SEND_CODE_POST_SIGN_UP}">${this.FRONTEND_BASE_URL}</a>.
      `,
    };
  }

  sendCodeForgotPassword(): CustomMessageReturnValue {
    return {
      emailSubject: `Reset your password for ${
        this.FRONTEND_BASE_URL
      } | ${new Date().toLocaleString()}`,
      emailMessage: `Hi <b>${this.userAttributes.given_name} ${this.userAttributes.family_name}</b>!
      
      <br />
      Please click on the link to update your password: <a href="${this.FRONTEND_LINKS.SEND_CODE_FORGOT_PASSWORD}">${this.FRONTEND_BASE_URL}</a>.
      `,
    };
  }

  sendCodeVerifyNewEmail(): CustomMessageReturnValue {
    return {
      emailSubject: `Validate your new email for ${
        this.FRONTEND_BASE_URL
      } | ${new Date().toLocaleString()}`,
      emailMessage: `Hi <b>${this.userAttributes.given_name} ${this.userAttributes.family_name}</b>!
      <br />
      
      Please click on the link to update your email address: <a href="${this.FRONTEND_LINKS.SEND_CODE_VERIFY_NEW_EMAIL}">${this.FRONTEND_BASE_URL}</a>.
      `,
    };
  }

  sendTemporaryPassword(): CustomMessageReturnValue {
    return {
      emailSubject: `Your account for ${
        this.FRONTEND_BASE_URL
      } | ${new Date().toLocaleString()}`,
      emailMessage: `Hi User!<br>An administrator has created your credentials for ${this.FRONTEND_BASE_URL}.<br>Your username is <b>${this.usernameParameter}</b> and your temporary password is <b>${this.codeParameter}</b><br>You can paste them in the form at <a href="${this.FRONTEND_LINKS.SEND_TEMPORARY_PASSWORD}">${this.FRONTEND_BASE_URL}</a> in order to log in.`,
    };
  }

  resendConfirmationCode(): CustomMessageReturnValue {
    return {
      emailSubject: `Your sign-up confirmation link for ${
        this.FRONTEND_BASE_URL
      } | ${new Date().toLocaleString()}`,
      emailMessage: `Hi <b>${this.userAttributes.given_name} ${this.userAttributes.family_name}</b>!<br>Thank you for signing up.
      
      <br />
      Please click on the link to activate your account: <a href="${this.FRONTEND_LINKS.RESEND_CONFIRMATION_CODE}">${this.FRONTEND_BASE_URL}</a>.`,
    };
  }
}

export default CustomMessage;
