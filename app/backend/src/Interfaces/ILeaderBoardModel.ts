import { IMatches } from './IMatches';

export interface ILeaderBoarderModel {
  leaderHome():Promise<IMatches[]>;
  leaderAway(): Promise<IMatches[]>
}
