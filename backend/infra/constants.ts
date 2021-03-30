export const STACK_PREFIX = 'amplify-react-auth';
export const DEPLOY_ENVIRONMENT = process.env.DEPLOY_ENVIRONMENT || 'dev';
export const DEPLOY_REGION = process.env.CDK_DEFAULT_REGION;
export const FRONTEND_BASE_URL =
  DEPLOY_ENVIRONMENT === 'prod'
    ? 'http://localhost:3000'
    : 'http://localhost:3000';
