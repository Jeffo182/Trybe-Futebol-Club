import { ITeamName } from '../Team/ITeam';

export type TInProgress = string | undefined;

export interface IMatchScore {
  awayTeamGoals: number,
  homeTeamGoals: number
}

export interface INewMatch extends IMatchScore {
  homeTeamId: number,
  awayTeamId: number,
}

export interface IMatch extends INewMatch {
  id: number,
  homeTeam: ITeamName,
  awayTeam: ITeamName
  inProgress: boolean,
}

export interface IMatchInPromise extends INewMatch {
  id: number,
  inProgress: boolean,
}

export interface IResponseMatchGetAll {
  dataValues: {
    homeTeam: { dataValues: { teamName: string } }
    awayTeam: { dataValues: { teamName: string } }
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
    inProgress: boolean,
  }
}
