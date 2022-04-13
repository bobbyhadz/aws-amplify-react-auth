#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import {AmplifyReactStack} from './amplify-react-stack';
import {DEPLOY_REGION, STACK_PREFIX} from './constants';

const app = new cdk.App();

// DEV Stack
new AmplifyReactStack(app, `${STACK_PREFIX}-dev`, {
  stackName: `${STACK_PREFIX}-dev`,
  env: {
    region: DEPLOY_REGION,
  },
  tags: {env: 'dev'},
});
