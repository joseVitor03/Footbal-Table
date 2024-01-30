import { ITeams } from './ITeams';

export interface ITeamsModel {
  listTeam(): Promise<ITeams[]>
  findTeam(id: ITeams['id']): Promise<ITeams | null>
}
