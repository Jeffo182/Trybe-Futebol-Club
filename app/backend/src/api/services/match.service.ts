import { ModelStatic } from 'sequelize';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import { IMatch, IMatchInPromise, IMatchScore, INewMatch } from '../interfaces/Matches/IMatch';
import IMatchService from '../interfaces/Matches/IMatchService';
import InvalidValues from './errorHandling/InvalidValues';
import NotFound from './errorHandling/NotFound';
import TeamService from './team.service';
import { validateId, validateNewMatch, validateScore } from './validations/validations';

class MatchService implements IMatchService {
  protected model: ModelStatic<Match> = Match;

  async getAll(getFilter?: string | undefined): Promise<IMatch[]> {
    const getWhereCond = getFilter ? { inProgress: JSON.parse(getFilter) } : {};
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: getWhereCond,
    });

    const response = matches.map(
      ({
        dataValues: {
          homeTeam: { dataValues: homeTeam },
          awayTeam: { dataValues: awayTeam },
          ...infoMatches
        },
      }) => ({ ...infoMatches, homeTeam, awayTeam }),
    );
    return response;
  }

  async getById(id: string | number): Promise<INewMatch> {
    validateId(id);
    const match = await this.model.findByPk(id);
    if (!match) throw new NotFound('Match not found');
    return match;
  }

  async finishMatch(id: string | number): Promise<boolean> {
    await this.getById(id);
    const [affectedRows] = await this.model
      .update({ inProgress: false }, { where: { id } });
    return affectedRows === 1;
  }

  async changeScore(
    id: string | number,
    { awayTeamGoals, homeTeamGoals }: IMatchScore,
  ): Promise<IMatchScore> {
    await this.getById(id);
    validateScore({ awayTeamGoals, homeTeamGoals });
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { homeTeamGoals, awayTeamGoals };
  }

  async createMatch(newMatch: INewMatch): Promise<IMatchInPromise> {
    validateNewMatch(newMatch);
    if (newMatch.awayTeamId === newMatch.homeTeamId) {
      throw new InvalidValues('It is not possible to create a match with two equal teams');
    }
    const teams = await new TeamService()
      .findAllFiltered([Number(newMatch.awayTeamId), Number(newMatch.homeTeamId)]);
    if (teams.length !== 2) throw new NotFound('There is no team with such id!');
    const response = await this.model.create({ ...newMatch, inProgress: true });
    return response.dataValues;
  }
}

export default MatchService;
