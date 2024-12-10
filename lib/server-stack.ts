import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Context } from 'src/config/context';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
export class ServerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps, context: Context) {
    super(scope, id, props);

    const userTable = new dynamodb.Table(this, 'UserTable', {
      tableName: 'user_table',
      partitionKey: { name: 'user_id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const taskTable = new dynamodb.Table(this, 'TaskTable', {
      tableName: 'task_table',
      partitionKey: { name: 'task_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'user_id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const lambdaFunction = new lambda.Function(this, 'NestLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        USER_TABLE: userTable.tableName,
        TASK_TABLE: taskTable.tableName,
      },
    });

    userTable.grantReadWriteData(lambdaFunction);
    taskTable.grantReadWriteData(lambdaFunction);

    const api = new apigateway.LambdaRestApi(this, 'NestApiGateway', {
      handler: lambdaFunction,
      proxy: true,
    });

    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
    });
  }
}
