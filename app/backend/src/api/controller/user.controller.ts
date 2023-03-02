import { NextFunction, Request, Response } from 'express';
import ILoginController, { ILoginService } from '../interfaces/Login/ILogin';
import IUser from '../interfaces/User/IUser';
import { decodeToken } from '../utils/Jwt';

class UserController implements ILoginController {
  protected service: ILoginService;
  constructor(service: ILoginService) {
    this.service = service;
  }

  async findRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const token = req.headers.authorization as string;
      const infoUser = decodeToken(token) as IUser;
      const role = await this.service.findRole(infoUser);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const infoUser = req.body;
      const token = await this.service.login(infoUser);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
