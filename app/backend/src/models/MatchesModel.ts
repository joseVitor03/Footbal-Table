// import SequelizeTeams from '../database/models/SequelizeTeams';
import { TypeInsertMatches } from '../types/Matches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { IMatches } from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  async matchesFilter(progress: boolean): Promise<IMatches[] | null> {
    const matches = await this.model.findAll({ where: { inProgress: Boolean(progress) },
      include: [{ model: SequelizeTeams,
        as: 'homeTeam' }, { model: SequelizeTeams, as: 'awayTeam' }] });
    return matches;
  }

  async matchesNotFilter(): Promise<IMatches[] | null> {
    const matches = await this.model.findAll({ include: [{ model: SequelizeTeams,
      as: 'homeTeam' }, { model: SequelizeTeams, as: 'awayTeam' }] });
    return matches;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateScoreboard({ id, awayTeamGoals, homeTeamGoals }:
  { id: number; awayTeamGoals: number; homeTeamGoals: number; }): Promise<[number]> {
    const update = await this.model.update({ awayTeamGoals, homeTeamGoals }, { where: { id } });
    return update;
  }

  // async findMatch({ homeTeamId, awayTeamId }: { homeTeamId: number; awayTeamId: number; }):
  // Promise<IMatches | null> {
  //   const match = await this.model.findOne({ where: { homeTeamId, awayTeamId } });
  //   return match;
  // }

  async insertMatch({ homeTeamId, awayTeamId, awayTeamGoals, homeTeamGoals }: TypeInsertMatches):
  Promise<IMatches> {
    const created = await this.model.create({ homeTeamGoals,
      awayTeamGoals,
      awayTeamId,
      homeTeamId,
      inProgress: true });
    return created;
  }
}
