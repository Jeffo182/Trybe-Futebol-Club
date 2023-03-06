import { NextFunction, Request, Response } from 'express';

export interface ITeam {
  id: number;
  teamName: string
}
export interface ITeamName {
  teamName: string
}

interface ITeamsService {
  getAll(): Promise<ITeam[]>,
  getSingleTeam(id: number | string): Promise<ITeam>,
}

export interface ITeamController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>,
  getSingleTeam(req: Request, res: Response, next: NextFunction): Promise<Response | void>,
}

export default ITeamsService;
