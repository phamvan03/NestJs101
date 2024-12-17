import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.envrc' });
AWS.config.update({
    region: process.env.AWS_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: any) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE!,
    Key: { id: event.queryStringParameters?.id || '' },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error reading from DynamoDB", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
