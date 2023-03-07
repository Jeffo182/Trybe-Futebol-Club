import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/leaderBoard.controller';

const leaderBoardController = new LeaderBoardController();

const leaderBoardRouter = Router();
// function route
leaderBoardRouter.get('/', (req: Request, res: Response) =>
  leaderBoardController.getResults(req, res));

leaderBoardRouter.get('/home', (req: Request, res: Response) =>
  leaderBoardController.getResultsHome(req, res));

leaderBoardRouter.get('/away', (req: Request, res: Response) =>
  leaderBoardController.getResultsAway(req, res));

export default leaderBoardRouter;
