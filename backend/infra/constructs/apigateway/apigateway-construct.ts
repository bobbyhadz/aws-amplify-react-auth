import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apiGatewayAuthorizers from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {
  DEPLOY_ENVIRONMENT,
  FRONTEND_BASE_URL,
  STACK_PREFIX,
} from '../../constants';

type HttpApiConstructProps = {
  userPool: cognito.UserPool;
  userPoolClient: cognito.UserPoolClient;
};

export class HttpApiConstruct extends Construct {
  public readonly httpApi: apiGateway.HttpApi;

  public readonly httpApiCognitoAuthorizer: apiGatewayAuthorizers.HttpUserPoolAuthorizer;

  constructor(scope: Construct, id: string, props: HttpApiConstructProps) {
    super(scope, id);

    this.httpApi = new apiGateway.HttpApi(this, 'api', {
      description: `___${DEPLOY_ENVIRONMENT}___ Api for ${STACK_PREFIX}`,
      apiName: `${STACK_PREFIX}-api-${DEPLOY_ENVIRONMENT}`,
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          apiGateway.CorsHttpMethod.OPTIONS,
          apiGateway.CorsHttpMethod.GET,
          apiGateway.CorsHttpMethod.POST,
          apiGateway.CorsHttpMethod.PUT,
          apiGateway.CorsHttpMethod.PATCH,
          apiGateway.CorsHttpMethod.DELETE,
        ],
        allowCredentials: true,
        allowOrigins: [FRONTEND_BASE_URL],
      },
    });

    const {userPool, userPoolClient} = props;

    this.httpApiCognitoAuthorizer =
      new apiGatewayAuthorizers.HttpUserPoolAuthorizer(
        'api-cognito-authorizer',
        userPool,
        {
          userPoolClients: [userPoolClient],
          identitySource: ['$request.header.Authorization'],
        },
      );
  }
}
