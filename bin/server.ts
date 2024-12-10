import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ServerStack } from "../src/config/aws-cdk";
import { Context } from "../src/config/context";

const app = new cdk.App();

async function main() {
  const env = app.node.tryGetContext("env");
  if (!env) {
    throw new Error(
      "khogn co env"
    );
  }
  const context = await Context.createContext(env);

  new ServerStack(
    app,
    "ServerStack",
    {
      stackName: `${context.serviceName}-${context.environment}-main`,
      description: `${context.stackDescription} : WebAPI`,
      tags: {
        Service: `${context.serviceName}`,
        Env: `${context.environment}`,
      },
      env: {
        account: context.awsAccount.accountId,
        region: context.awsAccount.region,
      },
    },
    context
  );
}
main();
