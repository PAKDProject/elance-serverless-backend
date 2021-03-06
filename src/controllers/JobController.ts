import { Router, Response, Request, NextFunction } from "express";
import { BaseRouter } from "../interfaces/baseRouter";
import * as TableModel from "../models/tableModel";
import { v4 as uuid } from "uuid";
import { CheckAccessToken } from "../middleware/checkToken";
import { ValidateJob } from "../lib/validator";

/**
 * @class JobController used to control the job route
 */
export class JobController implements BaseRouter {
  /**
   * @property basePath used as a base for routing related to the index
   */
  basePath: string = "/jobs";

  /**
   * @constructor
   */
  constructor() { }

  /**
   * Returns a configured router for the route
   * @returns Router
   */
  returnRouter(): Router {
    const entityType = "job";
    return Router()
      .get("/", CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
        try {
          let jobs = await TableModel.findDocumentsByType(entityType);
          if (jobs.data.length === 0) res.status(404).json({ message: "No jobs in collection" });
          res.status(200).json({ message: "Jobs found", jobs: jobs.data });
        } catch (error) {
          res.status(404).json({ message: "Something went wrong. Jobs not found", error: error });
          next(error);
        }
      })
      .get("/:id", CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
        try {
          let job = await TableModel.findDocumentById(req.params.id, entityType);
          if (job.data) res.status(200).json({ message: "Job found", job: job.data });
        } catch (error) {
          res.status(404).json({ message: "Something went wrong. Job not found", error: error });
          next(error);
        }
      })
      .post('/batch', CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
        try {
          let jobIds = req.body
          let jobs = await TableModel.batchFindDocumentsByIds(jobIds, entityType);
          if (jobs.data) res.status(200).json({ message: 'Jobs found', jobs: jobs.data });
        } catch (error) {
          res.status(404).json({ message: 'Something went wrong. Jobs not found', error: error });
          next(error);
        }
      })
      .post("/", async (req: Request, res: Response, next: NextFunction) => {
        try {
          let partialJob = req.body;
          partialJob.id = uuid();
          partialJob.entity = "job";
          if (!ValidateJob(partialJob)) throw "Job is invalid, try again scrub."
          const job = await TableModel.createNewDocument(partialJob);
          res.status(201).json({ message: "Job created", job: job.data });
        } catch (error) {
          res.status(400).json({ message: "Something went wrong. Job not created", statusCode: error.statusCode || 0, error: error });
          next(error);
        }
      })
      .put("/:id", async (req: Request, res: Response, next: NextFunction) => {
        try {
          const jobUpdates = req.body as TableModel.TableModel;
          if (!ValidateJob(jobUpdates)) throw "Job is invalid, try again scrub."
          const job = await TableModel.updateDocument(req.params.id, entityType, req.body);
          res.status(200).json({ message: "Job updated", job: job.data });
        } catch (error) {
          res.status(400).json({ message: "Something went wrong. Job not updated", error: error });
          next(error);
        }
      })
      .delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
        try {
          const job = await TableModel.deleteDocument(req.params.id, entityType);
          res.status(200).json({ message: "Job deleted", job: job.data });
        } catch (error) {
          res.status(400).json({ message: "Something went wrong. Job not deleted", error: error });
        }
      }
      )
  }
}
