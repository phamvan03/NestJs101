"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_serverless_express_1 = require("aws-serverless-express");
const express = require('express');
const dynamoose = __importStar(require("dynamoose"));
const platform_express_1 = require("@nestjs/platform-express");
const AWS = __importStar(require("aws-sdk"));
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const user_schema_1 = require("./Domain/entities/user.schema");
const task_schema_1 = require("./Domain/entities/task.schema");
const dynamoDb = new AWS.DynamoDB();
let cachedServer;
async function bootstrapServer() {
    if (!cachedServer) {
        const expressApp = express();
        expressApp.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        expressApp.use(express.json({ limit: '10mb' }));
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), {
            cors: true,
        });
        app.setGlobalPrefix('/dev/api');
        await app.init();
        cachedServer = (0, aws_serverless_express_1.createServer)(expressApp);
    }
    return cachedServer;
}
const handler = async (event, context) => {
    const tablePrefix = 'vantest';
    const userTable = `${tablePrefix}-users`;
    const taskTable = `${tablePrefix}-tasks`;
    const userModel = dynamoose.model(userTable, user_schema_1.UserSchema);
    const taskModel = dynamoose.model(taskTable, task_schema_1.TaskSchema);
    const doesTableExist = async (tableName) => {
        try {
            const result = await dynamoDb.describeTable({ TableName: tableName }).promise();
            return !!result.Table;
        }
        catch (error) {
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
    }
    else {
        console.log(`User table ${userTable} already exists.`);
    }
    const taskTableExists = await doesTableExist(taskTable);
    if (!taskTableExists) {
        console.log(`Task table ${taskTable} does not exist`);
        await taskModel.createTable();
    }
    else {
        console.log(`Task table ${taskTable} already exists`);
    }
    cachedServer = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map