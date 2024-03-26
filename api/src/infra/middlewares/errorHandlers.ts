import * as express from "express";
import { UnprocessableEntityError } from "../../domain/dtos/errors/unprocessableEntityError";
import { NotFoundError } from "../../domain/dtos/errors/notFoundError";

const handledHttpStatusErrors = [
  UnprocessableEntityError,
  NotFoundError,
];
const errorStatusMapping = {
  UnprocessableEntityError: 422,
  NotFoundError: 404,
  DefaultError: 500,
};

const getErrorStatusCode = (error: Error): any => {
  const errorName = error.constructor.name;
  return errorStatusMapping[errorName] || 500;
};

const isErrorHandled = (error: Error): boolean => {
  return handledHttpStatusErrors.some(
    (errorClass) => error instanceof errorClass
  );
};

export const registerErrorHandlers = (app: express.Express): void => {
  app.use(
    (
      error: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (isErrorHandled(error)) {
        return res.status(getErrorStatusCode(error)).json({
          message: error.message,
        });
      }
      res.status(500).json({ error: error.message });
    }
  );
};

export const errorHandlerWrapper =
  (handler: express.RequestHandler) =>
    async(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        Promise.resolve(handler(req, res, next)).catch(next);
      } catch (error) {
        next(error);
      }
    };
