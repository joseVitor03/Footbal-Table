import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/leaderBoard.controller';

const leaderBoardRouter = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderBoardController.leaderHome(req, res),
);

export default leaderBoardRouter;
