import { TypeLeaderBoardHomeTeam } from '../types/LeaderBoard';
import LeaderBoarderModel from '../models/LeaderBoardModel';
import createLeaderBoardHome from '../utils/createLeaderBoardHome';

export default class LeaderBoardService {
  constructor(private leaderBoardModel = new LeaderBoarderModel()) {}

  async leaderHome() {
    const teams = await this.leaderBoardModel.leaderHome();
    const table = createLeaderBoardHome(teams as TypeLeaderBoardHomeTeam[]);
    return { status: 200, data: table };
  }
}
