import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  private messageInvalidToken = { message: 'Token must be a valid token' };
  constructor(private matchesService = new MatchesService()) {}

  async matches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const { status, data } = await this.matchesService.matchesFilter(JSON.parse(inProgress));
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchesService.matchesNotFilter();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { authorization } = req.headers;
    try {
      if (authorization) {
        const [, token] = authorization.split(' ');
        jwt.verify(token, process.env.JWT_SECRET ?? 'jwt_secret');
      }
      const { status, data } = await this.matchesService.finishMatch(Number(id));
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(401).json(this.messageInvalidToken);
    }
  }

  async updateScoreboard(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { authorization } = req.headers;
    try {
      if (authorization) {
        const [, token] = authorization.split(' ');
        jwt.verify(token, process.env.JWT_SECRET ?? 'jwt_secret');
      }
      const { status, data } = await this.matchesService.updateScoreboard({ id: Number(id),
        awayTeamGoals,
        homeTeamGoals });
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(401).json(this.messageInvalidToken);
    }
  }

  async insertMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { authorization } = req.headers;
    try {
      if (authorization) {
        const [, token] = authorization.split(' ');
        jwt.verify(token, process.env.JWT_SECRET ?? 'jwt_secret');
      }
      const { status, data } = await this.matchesService.insertMatch({ homeTeamId,
        awayTeamId,
        awayTeamGoals,
        homeTeamGoals });
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(401).json(this.messageInvalidToken);
    }
  }
}
