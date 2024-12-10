import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Context } from "./context";

export class ServerStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps,
    context: Context
  ) {
    super(scope, id, props);

    const iamRoleForLambda = new cdk.aws_iam.Role(this, "RoleForLambda", {
      roleName: `${context.projectName}-lambda`,
      assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
    });
    iamRoleForLambda.addManagedPolicy(
      cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );
    iamRoleForLambda.attachInlinePolicy(
      new cdk.aws_iam.Policy(this, "RoleForLambdaInlinePolicy", {
        statements: [
          new cdk.aws_iam.PolicyStatement({
            actions: [
              "dynamodb:GetItem",
              "dynamodb:DeleteItem",
              "dynamodb:PutItem",
              "dynamodb:Scan",
              "dynamodb:Query",
              "dynamodb:UpdateItem",
              "dynamodb:BatchWriteItem",
              "dynamodb:BatchGetItem",
              "dynamodb:DescribeTable",
              "dynamodb:ConditionCheckItem",
            ],
            resources: [
              cdk.Fn.sub(
                "arn:${AWS::Partition}:dynamodb:${AWS::Region}:${AWS::AccountId}:table/${tableName}",
                { tableName: `${context.projectNameShort}-*` }
              ),
              cdk.Fn.sub(
                "arn:${AWS::Partition}:dynamodb:${AWS::Region}:${AWS::AccountId}:table/${tableName}/index/*",
                { tableName: `${context.projectNameShort}-*` }
              ),
            ],
          }),
        ],
      })
    );

    // Lambda Function
    const lambdaFunction = new cdk.aws_lambda.Function(
      this,
      `NestJS101Lambda`,
      {
        functionName: `${context.projectNameShort}-NestJS101Lambda`,
        code: cdk.aws_lambda.Code.fromAsset(
          path.resolve(__dirname, "..", "..", `vanpd-TestNest1.zip`)
        ),
        handler: "build/lambda.handler",
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        role: iamRoleForLambda,
        memorySize: 1024 * 2,
        logRetention: cdk.aws_logs.RetentionDays.FIVE_DAYS,
        environment: {
          DYNAMODB_TABLE_PREFIX: `${context.projectNameShort}`,
          SITE_DOMAIN: context.siteDomain,
          
        },
        timeout: cdk.Duration.seconds(10),
      }
    );

    // Log
    new cdk.aws_logs.LogGroup(this, `vanAPiLog`, {
      logGroupName: cdk.Fn.sub("/aws/lambda/${functionName}", {
        functionName: lambdaFunction.functionName,
      }),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      retention: cdk.aws_logs.RetentionDays.SIX_MONTHS,
    });

    // API Gateway
    const restApi = new cdk.aws_apigateway.RestApi(
      this,
      "NestApiGateway",
      {
        restApiName: `${context.projectNameShort}-vanpd`,
        deployOptions: {
          loggingLevel: cdk.aws_apigateway.MethodLoggingLevel.INFO,
          dataTraceEnabled: true,
          metricsEnabled: true,
          
        },
        cloudWatchRole: true,
        binaryMediaTypes: [
          "image/png",
          "multipart/form-data",
          "image/jpeg",
          "application/octet-stream",
        ],
      }
    );

    const restApiBase = restApi.root.addResource("dev").addResource("api");

    const restApiResource = restApiBase.addProxy({
      anyMethod: false,
      defaultIntegration: new cdk.aws_apigateway.LambdaIntegration(
        lambdaFunction
      ),
    });
    restApiResource.addCorsPreflight({
      allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS,
      allowMethods: cdk.aws_apigateway.Cors.ALL_METHODS,
      allowHeaders: cdk.aws_apigateway.Cors.DEFAULT_HEADERS,
      statusCode: 200,
    });
    restApiResource.addMethod("GET", undefined, {});
    restApiResource.addMethod("POST", undefined, {});
    restApiResource.addMethod("PUT", undefined, {});
    restApiResource.addMethod("DELETE", undefined, {});

    new cdk.CfnOutput(this, "NestJsBaseUrl", {
      value: "https://" + context.siteDomain + "/dev/api/",
    });

    new cdk.CfnOutput(this, "NestJsRestApiId", {
      value: restApi.restApiId,
    });

    new cdk.CfnOutput(this, "dev-lambda-arn", {
      exportName: "dev-lambda-arn",
      value: lambdaFunction.functionArn,
    });

    const userTable = new cdk.aws_dynamodb.Table(
      this,
      "DynamoTableUsers",
      {
        tableName: `${context.projectNameShort}-users`,
        partitionKey: {
          name: "user_id",
          type: cdk.aws_dynamodb.AttributeType.STRING,
        },
        billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        pointInTimeRecovery: false,
      }
    );
    userTable.addGlobalSecondaryIndex({
      indexName: "UsernameIndex",
      partitionKey: {
        name: "username",
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
      projectionType: cdk.aws_dynamodb.ProjectionType.KEYS_ONLY,
    });
    new cdk.CfnOutput(this, "DynamoTableUsersArn", {
      value: userTable.tableArn,
    });

    const taskTable = new cdk.aws_dynamodb.Table(this, "DynamoTableTasks", {
      tableName: `${context.projectNameShort}-tasks`,
      partitionKey: {
        name: "user_id",
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "task_id",
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pointInTimeRecovery: false,
    });
    taskTable.addLocalSecondaryIndex({
      indexName: "status_index",
      sortKey: {
        name: "status",
        type: cdk.aws_dynamodb.AttributeType.NUMBER,
      },
      projectionType: cdk.aws_dynamodb.ProjectionType.KEYS_ONLY,
    });

    new cdk.CfnOutput(this, "DynamoTableTasksArn", {
      value: taskTable.tableArn,
    });
  }
}
