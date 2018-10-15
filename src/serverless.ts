import { App } from './lib/createServer'
import { createServer, proxy } from 'aws-serverless-express'

let server = createServer(App)

module.exports.handler = (event, context) => proxy(server, event, context)