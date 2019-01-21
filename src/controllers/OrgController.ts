import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import * as TableModel from '../models/tableModel';
import { CheckAccessToken } from '../middleware/checkToken';

/**
* @class OrgController used to control the organisation route
*/
export class OrgController implements BaseRouter {
    /**
    * @property basePath used as a base for routing related to the index
    */
    basePath: string = '/orgs'

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
        const entityType = 'org';
        return Router()
            .get('/', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let orgs = await TableModel.findDocumentsByType(entityType);
                    if (orgs.data.length === 0) res.status(404).json({ message: 'No organisations in collection' })
                    res.status(200).json({ message: 'Organisations found', orgs: orgs.data });
                } catch (error) {
                    res.status(404).json({ message: 'Something went wrong. Organisations not found', error: error });
                    next(error);
                }
            })
            .get('/:id', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const org = await TableModel.findDocumentById(req.params.id, entityType);
                    if (org.data) res.status(200).json({ message: "Organisation found", org: org.data });
                } catch (error) {
                    res.status(404).json({ message: 'Something went wrong. Organisation not found', error: error });
                    next(error);
                }
            })
            .post('/', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let partialOrg = req.body;
                    partialOrg.entity = entityType;
                    const org = await TableModel.createNewDocument(req.body);
                    res.status(201).json({ message: 'Organisation created', org: org.data });
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. Organisation not created', error: error });
                    next(error);
                }
            })
            .put('/:id', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const org = await TableModel.updateDocument(req.params.id, entityType, req.body)
                    res.status(200).json({ message: 'Organisation updated', org: org.data })
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. Organisation not updated', error: error })
                    next(error)
                }
            })
            .delete('/:id', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const org = await TableModel.deleteDocument(req.params.id, entityType);
                    res.status(200).json({ message: 'Organisation deleted', org: org.data })
                } catch (error) {
                    res.status(400).json({ message: 'Something went wrong. Organisation not deleted', error: error })
                    next(error)
                }
            })
    }
}