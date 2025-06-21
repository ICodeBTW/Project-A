#!/bin/sh

# aws cloudformation create-change-set \
#   --stack-name dev-vpc-infrastructure \
#   --change-set-name initial-vpc-deployment \
#   --template-body file://cloudformation/networking.yml \
#   --parameters \
#     ParameterKey=Environment,ParameterValue=dev \
#     ParameterKey=VpcCidr,ParameterValue=10.0.0.0/16 \
#     ParameterKey=PublicSubnet1Cidr,ParameterValue=10.0.1.0/24 \
#     ParameterKey=PublicSubnet2Cidr,ParameterValue=10.0.2.0/24 \
#     ParameterKey=PrivateSubnet1Cidr,ParameterValue=10.0.11.0/24 \
#     ParameterKey=PrivateSubnet2Cidr,ParameterValue=10.0.12.0/24 \
#   --change-set-type CREATE \
#   --region ap-southeast-2

aws cloudformation describe-change-set \
  --stack-name dev-vpc-infrastructure \
  --change-set-name initial-vpc-deployment \
  --region ap-southeast-2 \
  --query 'Changes[*].{Action:Action,ResourceType:ResourceChange.ResourceType,LogicalId:ResourceChange.LogicalResourceId,Replacement:ResourceChange.Replacement}' \
  --output table
