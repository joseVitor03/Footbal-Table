import { ServiceResponse } from '../utils/mapStatusHTTP';
import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  async matchesNotFilter(): Promise<ServiceResponse<IMatches[] | null>> {
    const matches = await this.matchesModel.matchesNotFilter();
    return { status: 'SUCCESSFUL', data: matches };
  }

  async matchesFilter(inProgress: boolean): Promise<ServiceResponse<IMatches[] | null>> {
    const matches = await this.matchesModel.matchesFilter(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
