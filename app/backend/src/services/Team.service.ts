import { ServiceResponse } from '../utils/mapStatusHTTP';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamsModel = new TeamModel()) {}

  public async listTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.listTeam();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async findTeam(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamModel.findTeam(id);
    if (team) {
      return { status: 'SUCCESSFUL', data: team };
    }
    return { status: 'NOT_FOUND', data: { message: 'time não encontrado' } };
  }
}
