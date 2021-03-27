import AWS from 'aws-sdk';

export function adminAddUserToGroup({
  userPoolId,
  username,
  groupName,
}: {
  userPoolId: string;
  username: string;
  groupName: string;
}): Promise<{
  $response: AWS.Response<Record<string, string>, AWS.AWSError>;
}> {
  const params = {
    GroupName: groupName,
    UserPoolId: userPoolId,
    Username: username,
  };

  const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
  return cognitoIdp.adminAddUserToGroup(params).promise();
}
