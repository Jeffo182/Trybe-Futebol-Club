import { NextFunction, Request, Response, Router } from 'express';
import MatchController from '../controller/match.controller';
import IMatchController from '../interfaces/Matches/IMatchController';
import VerifyToken from '../middlewares/verifyToken';
import MatchService from '../services/match.service';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
// class Route
class MatchRouter {
  readonly route: Router;

  private controller: IMatchController;

  constructor(controller: IMatchController) {
    this.controller = controller;
    this.route = Router();
    this.loadRoutesPatch();
    this.loadRoutesGet();
    this.loadRoutesPost();
  }

  private loadRoutesGet() {
    this.route.get('/', (req: Request, res: Response, next: NextFunction) =>
      this.controller.getAll(req, res, next));
  }

  private loadRoutesPost() {
    this.route.post(
      '/',
      (req: Request, res: Response, next: NextFunction) =>
        VerifyToken.verify(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.createMatch(req, res, next),
    );
  }

  private loadRoutesPatch() {
    this.route.patch(
      '/:id',
      (req: Request, res: Response, next: NextFunction) =>
        VerifyToken.verify(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.changeScore(req, res, next),
    );
    this.route.patch(
      '/:id/finish',
      (req: Request, res: Response, next: NextFunction) =>
        VerifyToken.verify(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.finishMatch(req, res, next),
    );
  }
}

export default new MatchRouter(matchController).route;
