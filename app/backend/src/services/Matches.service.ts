import { TypeUpdateScore, TypeInsertMatches } from '../types/Matches';
import { ServiceResponse } from '../utils/mapStatusHTTP';
import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/IMatches';
import TeamModel from '../models/TeamModel';

export default class MatchesService {
  private teamModel = new TeamModel();
  constructor(private matchesModel = new MatchesModel()) {}

  async matchesNotFilter(): Promise<ServiceResponse<IMatches[] | null>> {
    const matches = await this.matchesModel.matchesNotFilter();
    return { status: 'SUCCESSFUL', data: matches };
  }

  async matchesFilter(inProgress: boolean): Promise<ServiceResponse<IMatches[] | null>> {
    const matches = await this.matchesModel.matchesFilter(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  async finishMatch(id: number): Promise<ServiceResponse<{ message: string } | null>> {
    await this.matchesModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateScoreboard({ id, awayTeamGoals, homeTeamGoals }: TypeUpdateScore):
  Promise<ServiceResponse<{ affectedCount: number } | null>> {
    const update = await this.matchesModel.updateScoreboard({ id, awayTeamGoals, homeTeamGoals });
    return { status: 'SUCCESSFUL', data: { affectedCount: update[0] } };
  }

  async insertMatch({ homeTeamId, awayTeamId, awayTeamGoals, homeTeamGoals }: TypeInsertMatches):
  Promise<ServiceResponse<IMatches>> {
    const existMatch = await this.matchesModel.findMatch({ homeTeamId, awayTeamId });
    if (existMatch) {
      return { status: 'UNPROCESSABLE',
        data: {
          message: 'It is not possible to create a match with two equal teams' } };
    }
    const notExistTeam = await this.teamModel.findTeams({ homeTeamId, awayTeamId });
    if (notExistTeam?.length !== 2) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const created = await this.matchesModel.insertMatch({ homeTeamGoals,
      homeTeamId,
      awayTeamGoals,
      awayTeamId });

    return { status: 'CREATED', data: created };
  }
}
