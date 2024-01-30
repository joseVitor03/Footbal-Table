import { Request, Response, Router } from 'express';
import TeamController from '../controller/Team.controller';

const routerTeam = Router();
const teamController = new TeamController();
routerTeam.get('/teams', (req: Request, res: Response) => teamController.listTeams(req, res));
routerTeam.get('/teams/:id', (req: Request, res: Response) => teamController.findTeam(req, res));
export default routerTeam;
