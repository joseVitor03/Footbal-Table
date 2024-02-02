import { ITeams } from './ITeams';

export interface ITeamsModel {
  listTeam(): Promise<ITeams[]>
  findTeam(id: ITeams['id']): Promise<ITeams | null>
  findTeams({ homeTeamId, awayTeamId }: { homeTeamId: number, awayTeamId: number }):
  Promise<ITeams[] | null>
}
