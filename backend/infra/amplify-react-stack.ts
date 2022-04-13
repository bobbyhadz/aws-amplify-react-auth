import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import * as cdk from 'aws-cdk-lib';
import {DEPLOY_REGION} from './constants';
import {HttpApiConstruct} from './constructs/apigateway';
import {
  IdentityPoolConstruct,
  UserPoolClientConstruct,
  UserPoolConstruct,
} from './constructs/cognito';
import {EndpointConstruct} from './constructs/endpoint';
import {UploadsBucketConstruct} from './constructs/s3/s3-construct';

export class AmplifyReactStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const {userPool} = new UserPoolConstruct(this, 'userpool');
    const {userPoolClient} = new UserPoolClientConstruct(
      this,
      'userpoolclient',
      {userPool},
    );
    const {identityPool} = new IdentityPoolConstruct(this, 'identitypool', {
      userPool,
      userPoolClient,
    });

    const {httpApi, httpApiCognitoAuthorizer} = new HttpApiConstruct(
      this,
      'http-api',
      {
        userPool,
        userPoolClient,
      },
    );

    const {s3Bucket} = new UploadsBucketConstruct(this, 's3-bucket');

    const defaultLambdaEnvVars = {
      USER_POOL_ID: userPool.userPoolId,
      IDENTITY_POOL_ID: identityPool.ref,
      ACCOUNT_ID: cdk.Aws.ACCOUNT_ID,
    };

    const getPresignedUrlEndpoint = new EndpointConstruct(
      this,
      'get-presigned-url-s3',
      {
        httpApi,
        authorizer: httpApiCognitoAuthorizer,
        methods: [apiGateway.HttpMethod.GET],
        routePath: '/get-presigned-url-s3',
        assetPath: 'get-presigned-url-s3/index.ts',
        environment: {
          ...defaultLambdaEnvVars,
          BUCKET_NAME: s3Bucket.bucketName,
          REGION: DEPLOY_REGION as string,
        },
      },
    );

    s3Bucket.grantPut(getPresignedUrlEndpoint.lambda);
    s3Bucket.grantPutAcl(getPresignedUrlEndpoint.lambda);

    new cdk.CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId,
    });
    new cdk.CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
    new cdk.CfnOutput(this, 'identityPoolId', {
      value: identityPool.ref,
    });
    new cdk.CfnOutput(this, 'region', {
      value: cdk.Stack.of(this).region,
    });
    new cdk.CfnOutput(this, 'apiUrl', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: httpApi.url!,
    });
    new cdk.CfnOutput(this, 'bucketName', {
      value: s3Bucket.bucketName,
    });
  }
}
