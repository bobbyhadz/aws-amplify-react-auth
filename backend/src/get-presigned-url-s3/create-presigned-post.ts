import {S3} from 'aws-sdk';

type GetPresignedPostUrlParams = {
  fileType: string;
  filePath: string;
  identityId: string;
};

export function createPresignedPost({
  fileType,
  filePath,
  identityId,
}: GetPresignedPostUrlParams): Promise<S3.PresignedPost> {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Fields: {key: filePath, acl: 'public-read'},
    Conditions: [
      // content length restrictions: 0-1MB]
      ['content-length-range', 0, 1000000],
      // specify content-type to be more generic- images only
      // ['starts-with', '$Content-Type', 'image/'],
      ['eq', '$Content-Type', fileType],
      ['starts-with', '$key', identityId],
    ],
    // number of seconds for which the presigned policy should be valid
    Expires: 15,
  };

  const s3 = new S3();
  return (s3.createPresignedPost(
    params,
  ) as unknown) as Promise<S3.PresignedPost>;
}

export function getFilePath(identityId: string): string {
  const fileName = generateId();
  return `${identityId}/${fileName}`;
}

function generateId() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!-.*()';

  const length = 10;

  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');

  return `${date}_${result}`;
}
