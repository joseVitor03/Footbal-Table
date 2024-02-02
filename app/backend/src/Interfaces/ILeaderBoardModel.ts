import { TypeLeaderBoardHomeTeam } from '../types/LeaderBoard';
import { IMatches } from './IMatches';

export interface ILeaderBoarderModel {
  leaderHome():Promise<TypeLeaderBoardHomeTeam[] | IMatches[]>
}
