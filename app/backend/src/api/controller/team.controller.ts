import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getAll = async (_req: Request, res: Response) => {
    try {
      const teams = await this.teamService.getAll();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public getSingleTeam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await this.teamService.getSingleTeam(+id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
