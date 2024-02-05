import { TypeLeaderBoardHomeTeam, TypeLeaderBoardAwayTeam } from '../types/LeaderBoard';
import LeaderBoarderModel from '../models/LeaderBoardModel';
import createLeaderBoardHome from '../utils/createLeaderBoardHome';
import createLeaderBoardAway from '../utils/createLeaderBoarderAway';

export default class LeaderBoardService {
  constructor(private leaderBoardModel = new LeaderBoarderModel()) {}

  async leaderHome() {
    const teams = await this.leaderBoardModel.leaderHome();
    const table = createLeaderBoardHome(teams as TypeLeaderBoardHomeTeam[]);
    return { status: 200, data: table };
  }

  async leaderAway() {
    const teams = await this.leaderBoardModel.leaderAway();
    const table = createLeaderBoardAway(teams as TypeLeaderBoardAwayTeam[]);
    return { status: 200, data: table };
  }
}
