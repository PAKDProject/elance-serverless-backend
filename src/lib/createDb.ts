<<<<<<< HEAD
import { DynamoDB } from "aws-sdk";
=======
>>>>>>> 20e004520a3187646b44e919c62ba82b53ed1fb0
import { TypeDynamo } from "type-dynamo";

export const USERS_TABLE = process.env.USERS_TABLE
const IS_OFFLINE = process.env.IS_OFFLINE

export let typeDynamo;
if (IS_OFFLINE === 'true') typeDynamo = new TypeDynamo({region: 'localhost', endpoint: 'http://localhost:8000'});
else typeDynamo = new TypeDynamo({region: 'eu-west-1'});
