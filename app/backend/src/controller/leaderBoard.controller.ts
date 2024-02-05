import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private leaderBoarderService = new LeaderBoardService()) {}

  async leaderHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderBoarderService.leaderHome();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async leaderAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderBoarderService.leaderAway();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async leaderFull(_req:Request, res: Response) {
    const { status, data } = await this.leaderBoarderService.leaderFull();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
