import { NextFunction, Request, Response } from 'express';
import TokenFail from '../services/errorHandling/TokenFail';
import { decodeToken } from '../utils/Jwt';

class VerifyToken {
  public static verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) throw new TokenFail('Token not found');
    decodeToken(token);
    return next();
  }
}

export default VerifyToken;
