import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/Team';
import ITeamsService from '../interfaces/Team/ITeam';
import NotFound from './errorHandling/NotFound';
import { validateId } from './validations/validations';

export default class TeamService implements ITeamsService {
  protected model: ModelStatic<TeamModel> = TeamModel;

  public async getAll() {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getSingleTeam(id: number) {
    validateId(id);
    const team = await this.model.findByPk(id);
    if (!team) throw new NotFound('Team not found');
    return team;
  }
}
