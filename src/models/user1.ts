import { typeDynamo } from "../lib/createDb";

export class User {
    email?: string
    name?: string
}

export const UserRepo = typeDynamo.define(User, {
    tableName: 'users-table-dev',
    partitionKey: 'email'
}).getInstance();