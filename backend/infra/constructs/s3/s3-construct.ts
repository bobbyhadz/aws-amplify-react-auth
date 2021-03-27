import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import {FRONTEND_BASE_URL} from '../../constants';

export class UploadsBucketConstruct extends cdk.Construct {
  public readonly s3Bucket: s3.Bucket;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    this.s3Bucket = new s3.Bucket(this, id, {
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
          ],
          allowedOrigins: [FRONTEND_BASE_URL],
          allowedHeaders: ['*'],
        },
      ],
    });
  }
}
