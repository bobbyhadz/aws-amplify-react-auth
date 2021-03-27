#----------------------DEV ENVIRONMENT CDK --------------------#
#----------------------DEV ENVIRONMENT CDK --------------------#
#----------------------DEV ENVIRONMENT CDK --------------------#
DEV_ENV = dev
DEV_STACK_NAME = next-cognito-$(DEV_ENV)
DEV_DOMAIN = http://localhost:3000

cdk-synth-dev:
	cdk synth $(DEV_STACK_NAME) --no-staging > template.yaml 

cdk-deploy-dev:
	DEPLOY_ENV=$(DEV_ENV) FRONTEND_BASE_URL=$(DEV_DOMAIN) cdk deploy $(DEV_STACK_NAME) --outputs-file ../src/cdk-exports-dev.json

cdk-diff-dev:
	cdk diff $(DEV_STACK_NAME)

cdk-destroy-dev:
	cdk destroy $(DEV_STACK_NAME)

#----------------------PROD ENVIRONMENT CDK --------------------#
#----------------------PROD ENVIRONMENT CDK --------------------#
#----------------------PROD ENVIRONMENT CDK --------------------#
PROD_ENV = prod
PROD_STACK_NAME = next-cognito-$(PROD_ENV)
PROD_DOMAIN = https://example.com

cdk-synth-prod:
	cdk synth $(PROD_STACK_NAME) --no-staging > template.yaml

cdk-deploy-prod:
	DEPLOY_ENV=$(PROD_ENV) FRONTEND_BASE_URL=$(PROD_DOMAIN) cdk deploy $(PROD_STACK_NAME) --outputs-file ../src/cdk-exports-prod.json

cdk-diff-prod:
	cdk diff $(PROD_STACK_NAME)

#----------------------CDK UTILS--------------------#
#----------------------CDK UTILS--------------------#
#----------------------CDK UTILS--------------------#
cdk-doctor:
	cdk doctor

cdk-list:
	cdk list

cdk-context:
	cdk context

cdk-clean:
	rm -rf -v cdk.out/