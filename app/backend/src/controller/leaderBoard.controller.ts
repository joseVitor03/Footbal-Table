import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard.service';

export default class LeaderBoardController {
  constructor(private leaderBoarderService = new LeaderBoardService()) {}

  async leaderHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderBoarderService.leaderHome();
    return res.status(status).json(data);
  }

  async leaderAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderBoarderService.leaderAway();
    return res.status(status).json(data);
  }
}
