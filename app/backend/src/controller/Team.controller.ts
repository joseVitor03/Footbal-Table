import { Request, Response } from 'express';
import TeamService from '../services/Team.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async listTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamService.listTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findTeam(req: Request, res: Response) {
    const { id } = req.params;
    const { data, status } = await this.teamService.findTeam(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
