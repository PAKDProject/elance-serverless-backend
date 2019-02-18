import { WebSocketClient } from './connectionManager'

let success = {
    statusCode: 200
}

let failure = {
    statusCode: 400
}

let wsClient = new WebSocketClient()

async function connect(event, context) {
    try {
        await wsClient._connectClient(event.requestContext.connectionId, event.userId)

        return success
    } catch (error) {
        console.error(error)

        return failure
    }
}

async function disconnect(event, context) {
    try {
        await wsClient._disconnectClient(event.requestContext.connectionId)

        return success
    }
    catch (error) {
        console.error(error)

        return failure
    }
}

module.exports = {
    connect,
    disconnect
}