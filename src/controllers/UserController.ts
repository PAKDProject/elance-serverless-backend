import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import * as TableModel from '../models/tableModel';
import { CheckAccessToken } from '../middleware/checkToken';
import { addToS3, removeFromS3 } from '../lib/userCheck'
import { elasticSearch } from '../lib/createES';
import { ValidateUser } from '../lib/validator';

/**
* @class UserController used to control the user route
*/
export class UserController implements BaseRouter {
    /**
    * @property basePath used as a base for routing related to the index
    */
    basePath: string = '/users'

    /**
    * @constructor
    */
    constructor() {

    }

    /**
    * Returns a configured router for the route
    * @returns Router
    */
    returnRouter(): Router {
        const entityType = 'user';
        return Router()
            .get('/', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let users = await TableModel.findDocumentsByType(entityType);
                    if (users.data.length === 0) res.status(404).json({ message: 'No users in collection' })
                    res.status(200).json({ message: 'Users found', users: users.data });
                } catch (error) {
                    res.status(404).json({ message: 'Something went wrong. Users not found', error: error });
                    next(error);
                }
            })
            .get('/:id', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await TableModel.findDocumentById(req.params.id, entityType);
                    if (user.data) res.status(200).json({ message: "User found", user: user.data });
                } catch (error) {
                    res.status(404).json({ message: 'Something went wrong. User not found', error: error });
                    next(error);
                }
            })
            .post('/search', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const query = req.body;
                    const data = await elasticSearch.search({
                        index: 'users',
                        body: query
                    });
                    if (data) res.status(200).json({ message: 'Users found', users: data.hits.hits })
                } catch (error) {
                    res.status(404).json({ message: 'Something went wrong. Users not found.', error: error });
                    next(error);
                }
            })
            .post('/', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let partialUser = req.body as TableModel.TableModel;
                    partialUser.entity = entityType;
                    if (!ValidateUser(partialUser)) throw "User is invalid, try again scrub."
                    const user = await TableModel.createNewDocument(req.body);
                    res.status(201).json({ message: 'User created', user: user.data });
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. User not created', error: error });
                    next(error);
                }
            })
            .put('/:id', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const userUpdates = req.body;
                    if (!ValidateUser(userUpdates)) throw "The updates to the user are invalid, try again scrub."
                    const user = await TableModel.updateDocument(req.params.id, entityType, req.body)
                    res.status(200).json({ message: 'User updated', user: user.data })
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. User not updated', error: error })
                    next(error)
                }
            })
            .delete('/:id', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await TableModel.deleteDocument(req.params.id, entityType);
                    res.status(200).json({ message: 'User deleted', user: user.data })
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. User not deleted', error: error })
                    next(error)
                }
            })
            .post('/avatar-upload', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let image = req.body.image
                    let id = req.body.id
                    let oldImageUrl: string = req.body.oldImageUrl

                    if (image === undefined || id === undefined) {
                        throw new Error("Bad request")
                    }

                    if (oldImageUrl !== undefined) {
                        let imageId = oldImageUrl.split("https://s3-eu-west-1.amazonaws.com/intellilance-profile-images/")[1]

                        if (imageId === undefined) {
                            throw new Error("Passed in image url is incorrect")
                        }

                        await removeFromS3(id)
                    }

                    let uploadedAvatar: { file?: any, mimetype?: any, extension?: string, md5?: any } = {}
                    const allowedExtensions: Array<string> = [
                        "jpg",
                        "jpeg",
                        "png",
                        "svg"
                    ]

                    let buffer: Buffer = Buffer.from(image, "base64")


                    // if (!allowedExtensions.includes(uploadedAvatar.extension)) {
                    //     throw new Error("Wrong file type!")
                    // }

                    let data = await addToS3(id, buffer)
                    let url = `https://s3-eu-west-1.amazonaws.com/intellilance-profile-images/${data}`
                    res.status(201).json({
                        message: 'File uploaded successfully',
                        url
                    })
                }
                catch (error) {
                    res.status(422).send({
                        message: `Error: ${error.message}`
                    })
                    next(error)
                }
            })
    }
}