import type { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandle = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};
export default asyncHandle;