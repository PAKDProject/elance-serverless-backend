import DynamoDb = require('aws-sdk/clients/dynamodb')

export const USERS_TABLE = process.env.USERS_TABLE
const IS_OFFLINE = process.env.IS_OFFLINE

export let dynamoDb;
if (IS_OFFLINE === 'true'){
    dynamoDb = new DynamoDb.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    })
}
else{
    dynamoDb = new DynamoDb.DocumentClient();
}
