import AWS from 'aws-sdk';
import {DEPLOY_REGION} from '../../infra/constants';

export function getCognitoIdentityId(
  jwtToken: string,
): Promise<string> | never {
  const params = getCognitoIdentityIdParams(jwtToken);
  const cognitoIdentity = new AWS.CognitoIdentity();

  return cognitoIdentity
    .getId(params)
    .promise()
    .then(data => {
      if (data.IdentityId) {
        return data.IdentityId;
      }
      throw new Error('Invalid authorization token.');
    });
}

function getCognitoIdentityIdParams(jwtToken: string) {
  const {USER_POOL_ID, ACCOUNT_ID, IDENTITY_POOL_ID} = process.env;
  console.log('___ DEPLOY REGION IS:  ___', DEPLOY_REGION);
  const loginsKey = `cognito-idp.${DEPLOY_REGION}.amazonaws.com/${USER_POOL_ID}`;

  return {
    IdentityPoolId: IDENTITY_POOL_ID,
    AccountId: ACCOUNT_ID,
    Logins: {
      [loginsKey]: jwtToken,
    },
  };
}
