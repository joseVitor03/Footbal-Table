import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.controller';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get(
  '/matches',
  (req: Request, res: Response) => matchesController.matches(req, res),
);
// matchesRouter.get('/teams/:id', (req: Request, res: Response) => teamController.findTeam(req, res));
export default matchesRouter;
