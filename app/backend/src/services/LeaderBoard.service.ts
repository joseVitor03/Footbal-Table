import { ServiceResponse } from '../utils/mapStatusHTTP';
import { TypeLeaderBoardHomeTeam, TypeLeaderBoardAwayTeam } from '../types/LeaderBoard';
import LeaderBoarderModel from '../models/LeaderBoardModel';
import createLeaderBoardHome, { TeamStatistics } from '../utils/createLeaderBoardHome';
import createLeaderBoardAway from '../utils/createLeaderBoarderAway';
import createLeaderBoardFull from '../utils/createLeaderBoardFull';

export default class LeaderBoardService {
  constructor(private leaderBoardModel = new LeaderBoarderModel()) {}

  async leaderHome(): Promise<ServiceResponse<TeamStatistics[]>> {
    const teams = await this.leaderBoardModel.leaderHome();
    const table = createLeaderBoardHome(teams as TypeLeaderBoardHomeTeam[]);
    return { status: 'SUCCESSFUL', data: table };
  }

  async leaderAway(): Promise<ServiceResponse<TeamStatistics[]>> {
    const teams = await this.leaderBoardModel.leaderAway();
    const table = createLeaderBoardAway(teams as TypeLeaderBoardAwayTeam[]);
    return { status: 'SUCCESSFUL', data: table };
  }

  async leaderFull(): Promise<ServiceResponse<TeamStatistics[]>> {
    const teamsHome = await this.leaderHome();
    const teamsAway = await this.leaderAway();
    const tableFull = createLeaderBoardFull(
      teamsHome.data as TeamStatistics[],
      teamsAway.data as TeamStatistics[],
    );
    return { status: 'SUCCESSFUL', data: tableFull };
  }
}
