import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apiGatewayAuthorizers from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import * as apiGatewayIntegrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import path from 'path';
import {Construct} from 'constructs';

type EndpointConstructProps = {
  httpApi: apiGateway.HttpApi;
  authorizer: apiGatewayAuthorizers.HttpUserPoolAuthorizer;
  routePath: string;
  methods: apiGateway.HttpMethod[];
  assetPath: string;
  environment?: lambda.FunctionOptions['environment'];
  layers?: lambda.LayerVersion[];
  // specify layers or packages to not be included in lambda code as externals
  externalModules?: string[];
  dynamo?: {
    table: dynamodb.Table;
    permissions: string[];
  };
};
export class EndpointConstruct extends Construct {
  public readonly endpoint: apiGateway.HttpRoute[];

  public readonly lambda: NodejsFunction;

  constructor(scope: Construct, id: string, props: EndpointConstructProps) {
    super(scope, id);
    const {
      httpApi,
      dynamo,
      authorizer,
      routePath,
      assetPath,
      methods,
      environment,
      layers,
      externalModules,
    } = props;

    this.lambda = new NodejsFunction(this, id, {
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'main',
      entry: path.join(__dirname, `/../../../src/${assetPath}`),
      environment: environment && environment,
      layers: layers && layers,
      bundling: {
        minify: false,
        // modules already available in a layer should not be bundled
        externalModules: externalModules
          ? ['aws-sdk', ...externalModules]
          : ['aws-sdk'],
      },
    });

    if (dynamo?.table) {
      dynamo.table.grant(this.lambda, ...dynamo.permissions);
    }

    this.endpoint = httpApi.addRoutes({
      path: routePath,
      methods,
      integration: new apiGatewayIntegrations.HttpLambdaIntegration(
        `${id}-integration`,
        this.lambda,
      ),
      authorizer,
    });
  }
}
