import { IMatch, IMatchInPromise, IMatchScore, INewMatch } from './IMatch';

export default interface IMatchService {
  getAll(filter?: string): Promise<IMatch[]>,
  finishMatch(id: string | number): Promise<boolean>,
  getById(id: string | number): Promise<INewMatch>,
  changeScore(id: string | number, newScore: IMatchScore): Promise<IMatchScore>,
  createMatch(newMatch: INewMatch): Promise<IMatchInPromise>,
}
