import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import * as JobModel  from '../models/job';

/**
* @class JobController used to control the job route
*/
export class JobController implements BaseRouter {
    /**
    * @property basePath used as a base for routing related to the index
    */
    basePath: string = '/jobs'

    /**
    * @constructor
    */
    constructor() {

    }

    /**
    * Returns a configured router for the route
    * @returns Router
    */
    returnRouter() : Router {
        return Router()
        .get('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                let jobs = await JobModel.findAllJobs();
                if(jobs.data.length === 0) res.status(404).json({message: 'No jobs in collection'})
                res.status(200).json({message:'Jobs found', jobs: jobs.data});
            } catch (error) {
                res.status(404).json({message: 'Something went wrong. Jobs not found', error: error});
                next(error);
            }
        })
    }
}