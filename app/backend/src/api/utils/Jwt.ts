import 'dotenv/config';
// import { sign, SignOptions, verify } from 'jsonwebtoken';
import * as JWT from 'jsonwebtoken';
import IUser from '../interfaces/User/IUser';
import TokenFail from '../services/errorHandling/TokenFail';

const config: JWT.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};
const secretJwt = process.env.JWT_SECRET || 'fpdsmecn';

const generateToken = (userInfo: IUser) => JWT.sign(userInfo, secretJwt, config);

export const decodeToken = (token: string) => {
  try {
    const decodeInfo = JWT.verify(token, secretJwt);
    return decodeInfo;
  } catch (error) {
    throw new TokenFail('Token must be a valid token');
  }
};

export default generateToken;
