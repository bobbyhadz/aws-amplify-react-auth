import AWS from 'aws-sdk';

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
  const {USER_POOL_ID, ACCOUNT_ID, IDENTITY_POOL_ID, REGION} = process.env;
  const loginsKey = `cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;

  return {
    IdentityPoolId: IDENTITY_POOL_ID,
    AccountId: ACCOUNT_ID,
    Logins: {
      [loginsKey]: jwtToken,
    },
  };
}
