import { WebSocketClient } from './connectionManager'
import { fuccMaster } from './fuccSystem'
import * as TableModel from '../models/tableModel'
import * as AWS from 'aws-sdk'

let success = {
    statusCode: 200
}

let failure = {
    statusCode: 400
}

let wsClient = new WebSocketClient()
let endpoint = null

export async function connect(event, context) {
    endpoint = `${event.requestContext.apiId}.execute-api.eu-west-1.amazonaws.com/dev`
    try {
        let connectionId = event.requestContext.connectionId
        let userId = event.queryStringParameters.userId

        if (!connectionId || !userId) {
            throw new Error('ConnectionId or UserId are missing!')
        }

        try { //do a deploy
            let user = await TableModel.findDocumentById(userId, "fucc|connection")
            if (user.data !== undefined) {
                wsClient._send({
                    action: "fucc|logout",
                    content: ""
                }, user.data.connectionId, endpoint).then(async () => {
                    await wsClient._send({
                        action: "fucc|refresh",
                        content: ''
                    }, connectionId, endpoint)
                })
            }
        } catch (error) {
            console.log('No concurrent user or other error: ' + error)
        }
        await wsClient._connectClient(connectionId, userId, endpoint)

        return success
    } catch (error) {
        console.error(error)
        return failure
    }
}

export async function disconnect(event, context) {
    endpoint = `${event.requestContext.apiId}.execute-api.eu-west-1.amazonaws.com/dev`
    try {
        let user = await TableModel.findUserFromConnectionId(event.requestContext.connectionId)

        let userId = user.data[0].id
        await wsClient._disconnectClient(userId, endpoint)

        let onlineUsers = await TableModel.findDocumentsByType("fucc|connection")
        let foundUser = await TableModel.findDocumentById(user.data[0].id, "user")
        let result = onlineUsers.data.map(async onlineUser => {
            if (foundUser.data.contacts.map(x => x.id).includes(onlineUser.id)) {
                let message = {
                    action: "notify|user_offline",
                    content: {
                        id: foundUser.data.id,
                        fName: foundUser.data.fName,
                        lName: foundUser.data.lName
                    }
                }
                return await wsClient._send(message, onlineUser.connectionId, endpoint)
            }
        })
        await Promise.all(result)
        return success
    }
    catch (error) {
        console.error(error)
        return failure
    }
}

export async function sendMessage(event, context) {
    endpoint = `${event.requestContext.apiId}.execute-api.eu-west-1.amazonaws.com/dev`
    try {
        let { userId, content, senderUserId } = JSON.parse(event.body), recipent

        //Get recipent connectionId
        try {
            recipent = await TableModel.findDocumentById(userId, 'fucc|connection')
        } catch (error) {
            if (error.message === "ItemNotFound") {
                let message: TableModel.IInstantMessage = {
                    content,
                    isSeen: false,
                    recipentId: userId,
                    senderId: senderUserId,
                    timestamp: Date.now()
                }

                let im = {
                    id: Date.now().toString(),
                    entity: "fucc|message",
                    im: message
                }

                await TableModel.createNewDocument(im as TableModel.TableModel)
                throw new Error('No connection found!')
            }
            else {
                throw error
            }
        }
        let recipentConnectionId = recipent.data.connectionId

        let message: TableModel.IInstantMessage = {
            content,
            isSeen: false,
            recipentId: userId,
            senderId: senderUserId,
            timestamp: Date.now()
        }

        let im = {
            id: Date.now().toString(),
            entity: "fucc|message",
            im: message
        }

        await TableModel.createNewDocument(im as TableModel.TableModel)

        let messageToBeSent = {
            action: 'message',
            content: message
        }

        await wsClient._send(messageToBeSent, recipentConnectionId, endpoint)

        return success
    } catch (error) {
        console.error('Could not send a message.\n' + error)

        await wsClient._send({ action: 'error', errorType: 'ERR_SEND_MESSAGE', errorMessage: `Could not send a message!`, errorStack: JSON.stringify(error.message) }, event.requestContext.connectionId, endpoint)
            .catch(err => console.error(err))
        return success
    }
}

export async function defaultMessage(event, context) {
    endpoint = `${event.requestContext.apiId}.execute-api.eu-west-1.amazonaws.com/dev`
    try {
        let connectionId = event.requestContext.connectionId
        await wsClient._send({ action: 'error', errorType: 'ERR_WRONG_ACTION_TYPE', errorMessage: 'incorrect action type!' }, connectionId, endpoint)

        return success
    } catch (error) {
        console.error(error)
        return success
    }
}

export async function passContentOnConnection(event, context) {
    try {
        let configRes = await wsClient._getConfig()
        let endpoint = configRes.data.endpoint

        const results = event.Records.map(async record => {
            if (record.dynamodb.Keys.entity.S === "fucc|connection") {
                if (record.eventName == 'INSERT') {
                    let image = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
                    console.log(JSON.stringify(image))
                    var who = image.id
                    var where = image.connectionId
                    if (who === undefined) {
                        throw new Error('Nyet people in record')
                    }

                    let userMessages = await TableModel.getMessagesForUser(who)

                    const results = userMessages.data.map(async element => {
                        let message = {
                            action: "message|old",
                            content: element.im
                        }
                        return await wsClient._send(message, where, endpoint)
                    })

                    let onlineUsers = await TableModel.findDocumentsByType('fucc|connection')
                    let currentUser = await TableModel.findDocumentById(who, "user")

                    const notifyPeople = onlineUsers.data.map(async onlineUser => {
                        if (currentUser.data.contacts.map(x => x.id).includes(onlineUser.id)) {
                            let message = {
                                action: "notify|user_online",
                                content: {
                                    id: currentUser.data.id,
                                    fName: currentUser.data.fName,
                                    lName: currentUser.data.lName
                                }
                            }
                            return await wsClient._send(message, onlineUser.connectionId, endpoint)
                        }
                    })

                    const setOnlineContacts = onlineUsers.data.map(async onlineUser => {
                        if (currentUser.data.contacts.map(x => x.id).includes(onlineUser.id)) {
                            let message = {
                                action: "notify|user_already_online",
                                content: {
                                    id: onlineUser.id
                                }
                            }
                            return await wsClient._send(message, where, endpoint)
                        }
                    })

                    await Promise.all(results)
                    await Promise.all(setOnlineContacts)
                    await Promise.all(notifyPeople);
                }
            }
        })
        await Promise.all(results);
        return success;

    } catch (error) {
        console.error(error)
        return success
    }
}

export async function doFucc(event, context) {
    endpoint = `${event.requestContext.apiId}.execute-api.eu-west-1.amazonaws.com/dev`
    try {
        let { userId } = JSON.parse(event.body)
        let jobs = await fuccMaster(userId)
        console.log('Im doing shit')

        await wsClient._send({
            action: "fuccJobs",
            content: jobs,
        }, event.requestContext.connectionId, endpoint)
        return success
    } catch (error) {
        console.error(error)
        console.error(error.message)
        wsClient._send({
            action: 'error',
            content: error.message
        }, event.requestContext.connectionId, endpoint)
        return success
    }
}