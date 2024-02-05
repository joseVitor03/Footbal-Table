import { IMatches } from '../Interfaces/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { ILeaderBoarderModel } from '../Interfaces/ILeaderBoardModel';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class LeaderBoarderModel implements ILeaderBoarderModel {
  private model = SequelizeMatches;

  async leaderHome(): Promise<IMatches[]> {
    const teams = await this.model
      .findAll({ where: { inProgress: false },
        include: {
          model: SequelizeTeams,
          as: 'homeTeam',
        } });
    return teams;
  }

  async leaderAway(): Promise<IMatches[]> {
    const teams = await this.model
      .findAll({ where: { inProgress: false },
        include: {
          model: SequelizeTeams,
          as: 'awayTeam',
        } });
    return teams;
  }
}
