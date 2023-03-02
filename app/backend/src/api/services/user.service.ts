import { ModelStatic } from 'sequelize';
import User from '../../database/models/User';
import { ILoginService } from '../interfaces/Login/ILogin';
import IUser, { IUserLogin, IUserRole } from '../interfaces/User/IUser';
import { decodeHash } from '../utils/crpto';
import generateToken from '../utils/Jwt';
import NotFound from './errorHandling/NotFound';
import TokenFail from './errorHandling/TokenFail';
import { validateLogin } from './validations/validations';

class UserService implements ILoginService {
  protected model: ModelStatic<User> = User;

  async findRole({ email }: IUser): Promise<IUserRole> {
    const userFounded = await this.model.findOne({ where: { email } });
    if (!userFounded) throw new NotFound('Token must be a valid token');
    return { role: userFounded.role };
  }

  async login({ password, email }: IUserLogin): Promise<string> {
    validateLogin({ password, email });
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      throw new TokenFail('Invalid email or password');
    }
    const verifationPassword = await decodeHash(password, user.password);
    if (!verifationPassword) throw new TokenFail('Invalid email or password');
    const { dataValues: { password: p, ...info } } = user;
    return generateToken(info);
  }
}

export default UserService;
