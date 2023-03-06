import { IMatchScore, INewMatch } from '../../interfaces/Matches/IMatch';
import { IUserLogin } from '../../interfaces/User/IUser';
import BadReq from '../errorHandling/BadReq';
import TokenFail from '../errorHandling/TokenFail';
import idSchema, { loginSchema, matchScoreSchema, validateNewMatchScore } from './schema';

export const validateLogin = (userInfoLogin: IUserLogin) => {
  const { error } = loginSchema.validate(userInfoLogin);
  if (error) {
    if (error.message.includes('required')) throw new BadReq('All fields must be filled');
    if (error.message.includes('valid') || error.message.includes('at least')) {
      throw new TokenFail('Invalid email or password');
    }
  }
  if (userInfoLogin.email === '' || userInfoLogin.password === '') {
    throw new BadReq('All fields must be filled');
  }
};

export const validateId = (id: (string | number)) => {
  const { error } = idSchema.validate(id);
  if (error) throw new BadReq(error.message);
};

export const validateScore = (matchScore: IMatchScore) => {
  const { error } = matchScoreSchema.validate(matchScore);
  if (error) throw new BadReq(error.message);
};

export const validateNewMatch = (newMatch: INewMatch) => {
  const { error } = validateNewMatchScore.validate(newMatch);
  if (error) throw new BadReq(error.message);
};

export default validateLogin;
