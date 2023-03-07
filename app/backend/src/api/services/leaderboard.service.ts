import { ModelStatic } from 'sequelize';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import { Results } from '../interfaces/Leaderboard/ILeaderboard';

export default class LeaderBoardService {
  protected model: ModelStatic<Match> = Match;
  static modelTeam: ModelStatic<Team> = Team;

  static async getAll(): Promise<Team[]> {
    const resultTeams = await LeaderBoardService.modelTeam.findAll();
    return resultTeams;
  }

  public async getResults(teamSide: string): Promise<Results[]> {
    const matches = await this.model.findAll(
      { where: { inProgress: false } },
    );
    const resultsHome = LeaderBoardService
      .createObjTeams(await LeaderBoardService.getAll(), matches, teamSide);
    return resultsHome;
  }

  static createObjTeams(teams: Team[], matches: Match[], teamSide: string) {
    const arrayTeams = teams.map((team) => ({
      name: team.dataValues.teamName as string,
      totalPoints: LeaderBoardService.totalPoints(matches, team.id, teamSide),
      totalGames: LeaderBoardService.getTotalGames(matches, team.id, teamSide),
      totalVictories: LeaderBoardService.getVictories(matches, team.id, teamSide),
      totalDraws: LeaderBoardService.getDraws(matches, team.id, teamSide),
      totalLosses: LeaderBoardService.getLosses(matches, team.id, teamSide),
      goalsFavor: LeaderBoardService.getTotalGoals(matches, team.id, teamSide),
      goalsOwn: LeaderBoardService.getTotalGoalsOwn(matches, team.id, teamSide),
      goalsBalance: LeaderBoardService.calculateGoals(
        LeaderBoardService.getTotalGoals(matches, team.id, teamSide),
        LeaderBoardService.getTotalGoalsOwn(matches, team.id, teamSide),
      ),
      efficiency: LeaderBoardService.getEfficiency(matches, team.id, teamSide),
    }));
    const sorted = LeaderBoardService.sortTeams(arrayTeams);
    return sorted;
  }

  static calculateGoals(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  static getTotalGoals(matches: Match[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.reduce((acc, curr) => {
      let goals = acc;
      if (curr[side] === teamId) {
        goals += curr[goalsTeam];
      }
      return goals;
    }, 0);
  }

  static getTotalGoalsOwn(matches: Match[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    return matches.reduce((acc, curr) => {
      let goals = acc;
      if (curr[side] === teamId) {
        goals += curr[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`];
      }
      return goals;
    }, 0);
  }

  static getDraws(matches: Match[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId,
    ).filter((team) => team[goalsTeam]
    === team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static getVictories(matches: Match[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId,
    ).filter((team) => team[goalsTeam]
    > team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static getLosses(matches: Match[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId,
    ).filter((team) => team[goalsTeam]
    < team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static getTotalGames(matches: Match[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    return matches.filter((match) => match[side] === teamId).length;
  }

  static totalPoints(matches: Match[], teamId: number, teamSide: string): number {
    return (
      LeaderBoardService.getVictories(matches, teamId, teamSide) * 3)
      + (LeaderBoardService.getDraws(matches, teamId, teamSide) * 1);
  }

  static getEfficiency(matches: Match[], teamId: number, teamSide: string): number {
    const pontos = LeaderBoardService.totalPoints(matches, teamId, teamSide);
    const jogos = LeaderBoardService.getTotalGames(matches, teamId, teamSide);

    const resultado = Number(((pontos / (jogos * 3)) * 100).toFixed(2));

    return resultado;
  }

  static sortTeams(arr: Results[]): Results[] {
    return arr.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.goalsFavor - a.goalsOwn !== b.goalsFavor - b.goalsOwn) {
        return b.goalsFavor - b.goalsOwn - a.goalsFavor + a.goalsOwn;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  static getLeaderBoard(home: Results[], away: Results[]): Results[] {
    const arrLeaders: Results[] = home.map((homeArr) => {
      const awayAndHome = away.find((el) => el.name === homeArr.name);
      return { name: homeArr.name,
        totalPoints: homeArr.totalPoints + (awayAndHome?.totalPoints ?? 0),
        totalGames: homeArr.totalGames + (awayAndHome?.totalGames ?? 0),
        totalVictories: homeArr.totalVictories + (awayAndHome?.totalVictories ?? 0),
        totalDraws: homeArr.totalDraws + (awayAndHome?.totalDraws ?? 0),
        totalLosses: homeArr.totalLosses + (awayAndHome?.totalLosses ?? 0),
        goalsFavor: homeArr.goalsFavor + (awayAndHome?.goalsFavor ?? 0),
        goalsOwn: homeArr.goalsOwn + (awayAndHome?.goalsOwn ?? 0),
        goalsBalance: homeArr.goalsBalance + (awayAndHome?.goalsBalance ?? 0),
        efficiency: LeaderBoardService.efficiencyResult(
          homeArr.totalPoints + (awayAndHome?.totalPoints ?? 0),
          homeArr.totalGames + (awayAndHome?.totalGames ?? 0),
        ),
      };
    });
    return LeaderBoardService.sortTeams(arrLeaders);
  }

  static efficiencyResult(pontosTotais: number, jogosTotais: number): number {
    const resultado = Number(((pontosTotais / (jogosTotais * 3)) * 100).toFixed(2));
    return resultado;
  }
}
