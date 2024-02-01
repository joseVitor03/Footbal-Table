// import SequelizeTeams from '../database/models/SequelizeTeams';
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
}
