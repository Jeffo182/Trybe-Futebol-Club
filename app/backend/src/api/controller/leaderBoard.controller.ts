import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public async getResults(_req: Request, res: Response): Promise<Response | void> {
    const resultsHome = await this.leaderBoardService.getResults('home');
    const resultsAway = await this.leaderBoardService.getResults('away');

    const results = LeaderBoardService.getLeaderBoard(resultsHome, resultsAway);

    res.status(200).json(results);
  }

  public async getResultsHome(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.leaderBoardService.getResults('home');
    res.status(200).json(result);
  }

  public async getResultsAway(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.leaderBoardService.getResults('away');
    res.status(200).json(result);
  }
}
