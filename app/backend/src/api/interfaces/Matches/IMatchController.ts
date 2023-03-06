import { NextFunction, Request, Response } from 'express';

export default interface IMatchController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void | Response>,
  finishMatch(req: Request, res: Response, next: NextFunction): Promise<void | Response>,
  changeScore(req: Request, res: Response, next: NextFunction): Promise<void | Response>,
  createMatch(req: Request, res: Response, next: NextFunction): Promise<void | Response>
}
