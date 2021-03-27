import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda';
import {createPresignedPost, getFilePath} from './create-presigned-post';
import {getCognitoIdentityId} from './get-cognito-identity-id';

if (
  !process.env.BUCKET_NAME ||
  !process.env.USER_POOL_ID ||
  !process.env.IDENTITY_POOL_ID ||
  !process.env.ACCOUNT_ID ||
  !process.env.REGION
)
  throw new Error(
    'Environment variables BUCKET_NAME, USER_POOL_ID, IDENTITY_POOL_ID, ACCOUNT_ID, REGION are required.',
  );

type Event = APIGatewayProxyEventV2 & {
  headers: {authorization: string};
  queryStringParameters: {fileType: string};
};

export async function main(event: Event): Promise<APIGatewayProxyResultV2> {
  console.log('Event is', JSON.stringify(event, null, 2));
  try {
    if (!event.queryStringParameters?.fileType)
      throw new Error(
        'Querystring parameter fileType must be provided when creating a presigned URL, i.e. ?fileType=image/png',
      );

    const {fileType} = event.queryStringParameters;

    const identityId = await getCognitoIdentityId(event.headers.authorization);
    const filePath = getFilePath(identityId);

    const presignedPost = await createPresignedPost({
      fileType,
      filePath,
      identityId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({...presignedPost, filePath}),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 400,
        body: JSON.stringify([{message: error.message}]),
      };
    }
    return {
      statusCode: 400,
      body: JSON.stringify([{message: 'Something went wrong.'}]),
    };
  }
}
