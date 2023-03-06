import { NextFunction, Request, Response } from 'express';
import { IMatchScore, TInProgress } from '../interfaces/Matches/IMatch';
import IMatchController from '../interfaces/Matches/IMatchController';
import IMatchService from '../interfaces/Matches/IMatchService';
import BadRequest from '../services/errorHandling/BadReq';

class MatchController implements IMatchController {
  private service: IMatchService;
  constructor(service: IMatchService) {
    this.service = service;
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const inProgress = req.query.inProgress as TInProgress;
      let matches;
      if (inProgress) {
        if (inProgress !== 'true' && inProgress !== 'false') {
          throw new BadRequest('inProgress must be "true" or "false"');
        }
        matches = await this.service.getAll(inProgress);
      } else matches = await this.service.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async finishMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const finished = await this.service.finishMatch(Number(id));
      if (finished) return res.status(200).json({ message: 'Finished' });
      return res.status(200).json({ message: 'Match is alredy over' });
    } catch (error) {
      next(error);
    }
  }

  async changeScore(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const matchNewScore: IMatchScore = req.body;
      const newScore: IMatchScore = await this.service.changeScore(
        Number(id),
        matchNewScore,
      );
      return res.status(200).json(newScore);
    } catch (error) {
      next(error);
    }
  }

  async createMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const newMatch = await this.service.createMatch(req.body);
      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
