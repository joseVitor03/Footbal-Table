import { IMatches } from './IMatches';
import { TypeUpdateScore, TypeInsertMatches } from '../types/Matches';

export interface IMatchesModel {
  matchesNotFilter():Promise<IMatches[] | null>
  matchesFilter(inProgress: boolean): Promise<IMatches[] | null>
  finishMatch(id: number): Promise<void>;
  updateScoreboard({ id, awayTeamGoals, homeTeamGoals }:
  TypeUpdateScore): Promise<[affectedCount: number]>;
  // findMatch({ homeTeamId, awayTeamId }: { homeTeamId: number, awayTeamId: number }):
  // Promise<IMatches | null>;
  insertMatch({ homeTeamId, awayTeamId, awayTeamGoals, homeTeamGoals }: TypeInsertMatches):
  Promise<IMatches>
}
