import * as s3 from 'aws-cdk-lib/aws-s3';
import {FRONTEND_BASE_URL} from '../../constants';
import {Construct} from 'constructs';

export class UploadsBucketConstruct extends Construct {
  public readonly s3Bucket: s3.Bucket;

  constructor(scope: Construct, id: string) {
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
