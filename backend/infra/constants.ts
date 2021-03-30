export const STACK_PREFIX = 'amplify-react-auth';
export const DEPLOY_ENVIRONMENT = process.env.DEPLOY_ENVIRONMENT || 'dev';
export const DEPLOY_REGION = process.env.CDK_DEFAULT_REGION;
export const FRONTEND_BASE_URL =
  DEPLOY_ENVIRONMENT === 'prod'
    ? 'https://master.dulcodrloxvk6.amplifyapp.com/'
    : 'http://localhost:3000';
