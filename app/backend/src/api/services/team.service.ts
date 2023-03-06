import { ModelStatic, Op } from 'sequelize';
import TeamModel from '../../database/models/Team';
import ITeamsService, { ITeam } from '../interfaces/Team/ITeam';
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

  async findAllFiltered(ids: (number | string)[]): Promise<ITeam[]> {
    ids.forEach((id) => validateId(id));
    const teams = await this.model.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    const teamsFormated = teams.map(({ dataValues }) => dataValues);
    return teamsFormated;
  }
}
