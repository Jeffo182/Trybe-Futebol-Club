import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controller/user.controller';
import ILoginController from '../interfaces/Login/ILogin';
import verifyToken from '../middlewares/verifyToken';
import UserService from '../services/user.service';

const basedService = new UserService();
const basedController = new UserController(basedService);
// class Route
class UserRouter {
  readonly route: Router;

  private controller: ILoginController;

  constructor(controller: ILoginController) {
    this.controller = controller;
    this.route = Router();
    this.loadRoutes();
  }

  private loadRoutes() {
    this.route.get(
      '/role',
      (req: Request, res: Response, next: NextFunction) =>
        verifyToken.verify(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.findRole(req, res, next),
    );
    this.route.post('/', (req: Request, res: Response, next: NextFunction) =>
      this.controller.login(req, res, next));
  }
}

export default new UserRouter(basedController).route;
