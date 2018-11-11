import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import * as TableModel from '../models/tableModel';

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
        return Router()
            .get('/', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let users = await TableModel.findEntriesByType('user');
                    if (users.data.length === 0) res.status(404).json({ message: 'No users in collection' })
                    res.status(200).json({ message: 'Users found', users: users.data });
                } catch (error) {
                    res.status(404).json({ message: 'Something went wrong. Users not found', error: error });
                    next(error);
                }
            })
            .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await TableModel.findEntryById(req.params.id);
                    if (user.data) res.status(200).json({ message: "User found", user: user.data });
                } catch (error) {
                    res.status(404).json({ message: 'Something went wrong. User not found', error: error });
                    next(error);
                }
            })
            .post('/', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let partialUser = req.body;
                    partialUser.entity = 'user';
                    const user = await TableModel.postNewEntry(req.body);
                    res.status(201).json({ message: 'User created', user: user.data });
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. User not created', error: error });
                    next(error);
                }
            })
            .put('/:id', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await TableModel.updateEntry(req.params.id, req.body)
                    res.status(200).json({ message: 'User updated', user: user.data })
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. User not updated', error: error })
                    next(error)
                }
            })
            .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await TableModel.deleteEntry(req.params.id);
                    res.status(200).json({ message: 'User deleted', user: user.data })
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. User not deleted', error: error })
                }
            })
    }
}