import DDb = require('aws-sdk/clients/dynamodb')

export class DynamoDb {
    client = new DDb({region: 'eu-west-1'})
}