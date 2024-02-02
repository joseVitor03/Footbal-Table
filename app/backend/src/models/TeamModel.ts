import { ITeams } from '../Interfaces/ITeams';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';

export default class TeamModel implements ITeamsModel {
  private model = SequelizeTeams;
  async listTeam(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findTeam(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }

  async findTeams({ homeTeamId, awayTeamId }: { homeTeamId: number; awayTeamId: number; }):
  Promise<ITeams[] | null> {
    const teams = await this.model.findAll({ where: { id: [homeTeamId, awayTeamId] } });
    return teams;
  }
}
