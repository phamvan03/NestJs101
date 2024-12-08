import {
  Context,
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
} from 'aws-lambda';
import { proxy, createServer } from 'aws-serverless-express';
import { Server } from 'http';
const express = require('express');
import * as dynamoose from 'dynamoose';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserSchema } from './Domain/entities/user.schema';
import { TaskSchema } from './Domain/entities/task.schema';
const dynamoDb = new AWS.DynamoDB();

let cachedServer: Server;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    expressApp.use(
      (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Cho phép tất cả các domain
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE'); // Các phương thức HTTP được phép
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Các header được phép
        next();
      },
    );
    expressApp.use(express.json({ limit: '10mb' }));
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        cors: true,
      },
    );
    app.setGlobalPrefix('/dev/api');
    await app.init();
    cachedServer = createServer(expressApp);
  }
  return cachedServer;
}
// lambda fn
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  
  const tablePrefix = 'vantest';
  const userTable = `${tablePrefix}-users`;
  const taskTable = `${tablePrefix}-tasks`;
  const userModel = dynamoose.model(userTable, UserSchema);
  const taskModel = dynamoose.model(taskTable, TaskSchema);
  const doesTableExist = async (tableName: string) => {
    try {
      const result = await dynamoDb.describeTable({ TableName: tableName }).promise();
      return !!result.Table; 
    } catch (error) {
      if (error.code === 'ResourceNotFoundException') {
        return false;
      }
      throw error;
    }
  };

  const userTableExists = await doesTableExist(userTable);
  if (!userTableExists) {
    console.log(`User table ${userTable} does not exist`);
    await userModel.createTable();  
  } else {
    console.log(`User table ${userTable} already exists.`);
  }

  const taskTableExists = await doesTableExist(taskTable);
  if (!taskTableExists) {
    console.log(`Task table ${taskTable} does not exist`);
    await taskModel.createTable(); 
  } else {
    console.log(`Task table ${taskTable} already exists`);
  }

  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
