import { IMatches } from './IMatches';

export interface IMatchesModel {
  matchesNotFilter():Promise<IMatches[] | null>
  matchesFilter(inProgress: boolean): Promise<IMatches[] | null>
}
