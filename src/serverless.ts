import { App } from './lib/createServer'
import { createServer, proxy } from 'aws-serverless-express'

let server = createServer(new App().getApp())

module.exports.handler = (event, context) => proxy(server, event, context)