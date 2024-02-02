import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.controller';
import Validade from '../middlewares/ValidateLogin';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get(
  '/matches',
  (req: Request, res: Response) => matchesController.matches(req, res),
);

matchesRouter.patch(
  '/matches/:id',
  Validade.validToken,
  (req: Request, res: Response) => matchesController.updateScoreboard(req, res),
);

matchesRouter.patch(
  '/matches/:id/finish',
  Validade.validToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

matchesRouter.post(
  '/matches',
  Validade.validToken,
  (req: Request, res: Response) => matchesController.insertMatch(req, res),
);
export default matchesRouter;
