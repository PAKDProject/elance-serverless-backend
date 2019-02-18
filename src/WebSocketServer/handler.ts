import { WebSocketClient } from './connectionManager'
import { fuccMaster } from './fuccSystem'

let success = {
    statusCode: 200
}

let failure = {
    statusCode: 400
}

let wsClient = new WebSocketClient()

export async function connect(event, context) {
    try {
        await wsClient._connectClient(event.requestContext.connectionId, event.userId)
        return success
    } catch (error) {
        console.error(error)
        return failure
    }
}

export async function disconnect(event, context) {
    try {
        await wsClient._disconnectClient(event.requestContext.connectionId)
        return success
    }
    catch (error) {
        console.error(error)
        return failure
    }
}

export async function doFucc(event, context) {
    try {
        await fuccMaster(event, context)
    } catch (error) {
        console.error(error)
        return success
    }
}