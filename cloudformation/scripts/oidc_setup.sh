#!/bin/bash

GITHUB_ORG="ICodeBTW"  
GITHUB_REPO="Project-A"
PROJECT_NAME="Project-A"
AWS_REGION="ap-southeast-2"

# Deploy the OIDC stack
aws cloudformation deploy \
  --template-file ../OIDC-role.yml \
  --stack-name ${PROJECT_NAME}-github-oidc \
  --parameter-overrides \
    GitHubOrg=${GITHUB_ORG} \
    GitHubRepo=${GITHUB_REPO} \
    ProjectName=${PROJECT_NAME} \
  --capabilities CAPABILITY_NAMED_IAM \
  --region ${AWS_REGION}


# Get the role ARN
ROLE_ARN=$(aws cloudformation describe-stacks \
  --stack-name ${PROJECT_NAME}-github-oidc \
  --region ${AWS_REGION} \
  --query 'Stacks[0].Outputs[?OutputKey==`GitHubActionsRoleArn`].OutputValue' \
  --output text)

echo "Role ARN: $ROLE_ARN"