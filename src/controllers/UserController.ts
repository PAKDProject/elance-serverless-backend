import { Router, Response, Request, NextFunction } from "express";
import { BaseRouter } from "../interfaces/baseRouter";
import * as TableModel from "../models/tableModel";
import { CheckAccessToken } from "../middleware/checkToken";

/**
 * @class UserController used to control the user route
 */
export class UserController implements BaseRouter {
  /**
   * @property basePath used as a base for routing related to the index
   */
  basePath: string = "/users";

  /**
   * @constructor
   */
  constructor() {}

  /**
   * Returns a configured router for the route
   * @returns Router
   */
  returnRouter(): Router {
    const entityType = "user";
    return Router()
      .get("/", async (req: Request, res: Response, next: NextFunction) => {
        try {
          let users = await TableModel.findDocumentsByType(entityType);
          if (users.data.length === 0)
            res.status(404).json({ message: "No users in collection" });
          res.status(200).json({ message: "Users found", users: users.data });
        } catch (error) {
          res.status(404).json({
            message: "Something went wrong. Users not found",
            error: error
          });
          next(error);
        }
      })
      .get("/:id", async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user = await TableModel.findDocumentById(
            req.params.id,
            entityType
          );
          if (user.data)
            res.status(200).json({ message: "User found", user: user.data });
        } catch (error) {
          res.status(404).json({
            message: "Something went wrong. User not found",
            error: error
          });
          next(error);
        }
      })
      .post("/", async (req: Request, res: Response, next: NextFunction) => {
        try {
          let partialUser = req.body;
          partialUser.entity = entityType;
          const user = await TableModel.createNewDocument(req.body);
          res.status(201).json({ message: "User created", user: user.data });
        } catch (error) {
          res.status(400).json({
            message: "Something went wrong. User not created",
            error: error
          });
          next(error);
        }
      })
      .put("/:id", async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user = await TableModel.updateDocument(
            req.params.id,
            entityType,
            req.body
          );
          res.status(200).json({ message: "User updated", user: user.data });
        } catch (error) {
          res.status(400).json({
            message: "Something went wrong. User not updated",
            error: error
          });
          next(error);
        }
      })
      .put(
        "/:userId/:jobId",
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const user = await TableModel.updateDocument(
              req.params.userId,
              entityType,
              req.body
            );
            const job = await TableModel.deleteDocument(
              req.params.jobId,
              "job"
            );
            res.status(200).json({ message: "User updated", user: user.data });
          } catch (error) {
            res.status(400).json({
              message: "Something went wrong. User not updated",
              error: error
            });
            next(error);
          }
        }
      )
      .delete(
        "/:id",
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const user = await TableModel.deleteDocument(
              req.params.id,
              entityType
            );
            res.status(200).json({ message: "User deleted", user: user.data });
          } catch (error) {
            res.status(400).json({
              message: "Something went wrong. User not deleted",
              error: error
            });
          }
        }
      );
  }
}
