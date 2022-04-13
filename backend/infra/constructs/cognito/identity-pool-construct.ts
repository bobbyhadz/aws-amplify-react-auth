import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import {DEPLOY_ENVIRONMENT, STACK_PREFIX} from '../../constants';
import {Construct} from 'constructs';

type IdentityPoolConstructProps = {
  userPool: cognito.UserPool;
  userPoolClient: cognito.UserPoolClient;
};

export class IdentityPoolConstruct extends Construct {
  public readonly identityPool: cognito.CfnIdentityPool;

  constructor(scope: Construct, id: string, props: IdentityPoolConstructProps) {
    super(scope, id);

    const {userPool, userPoolClient} = props;

    this.identityPool = new cognito.CfnIdentityPool(this, 'identitypool', {
      allowUnauthenticatedIdentities: true,
      identityPoolName: `${STACK_PREFIX}-${DEPLOY_ENVIRONMENT}`,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    const isUserCognitoGroupRole = new iam.Role(this, 'users-group-role', {
      description: 'Default role for authenticated users',
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity',
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
    });

    const isAnonymousCognitoGroupRole = new iam.Role(
      this,
      'anonymous-group-role',
      {
        description: 'Default role for anonymous users',
        assumedBy: new iam.FederatedPrincipal(
          'cognito-identity.amazonaws.com',
          {
            StringEquals: {
              'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
            },
            'ForAnyValue:StringLike': {
              'cognito-identity.amazonaws.com:amr': 'authenticated',
            },
          },
          'sts:AssumeRoleWithWebIdentity',
        ),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaBasicExecutionRole',
          ),
        ],
      },
    );

    const isAdminCognitoGroupRole = new iam.Role(this, 'admins-group-role', {
      description: 'Default role for administrator users',
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity',
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
    });

    new cognito.CfnUserPoolGroup(this, 'users-group', {
      groupName: 'Users',
      userPoolId: userPool.userPoolId,
      description: 'The default group for authenticated users',
      precedence: 3, // the role of the group with the lowest precedence - 0 takes effect and is returned by cognito:preferred_role
      roleArn: isUserCognitoGroupRole.roleArn,
    });

    new cognito.CfnUserPoolGroup(this, 'admins-group', {
      groupName: 'Admins',
      userPoolId: userPool.userPoolId,
      description: 'The group for admin users with special privileges',
      precedence: 2, // the role of the group with the lowest precedence - 0 takes effect and is returned by cognito:preferred_role
      roleArn: isAdminCognitoGroupRole.roleArn,
    });

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      'identity-pool-role-attachment',
      {
        identityPoolId: this.identityPool.ref,
        roles: {
          authenticated: isUserCognitoGroupRole.roleArn,
          unauthenticated: isAnonymousCognitoGroupRole.roleArn,
        },
        roleMappings: {
          mapping: {
            type: 'Token',
            ambiguousRoleResolution: 'AuthenticatedRole',
            identityProvider: `cognito-idp.${
              cdk.Stack.of(this).region
            }.amazonaws.com/${userPool.userPoolId}:${
              userPoolClient.userPoolClientId
            }`,
          },
        },
      },
    );
  }
}
