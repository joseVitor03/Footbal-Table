import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/User.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { UserForGetRole } from '../types/User';

export default class UserController {
  private secretKey = process.env.JWT_SECRET ?? 'jwt_secret';
  constructor(private userService = new UserService()) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login({ email, password });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    try {
      if (authorization) {
        const [, token] = authorization.split(' ');
        const user = jwt.verify(token, this.secretKey);
        const { status, data } = await this.userService.getRole(user as UserForGetRole);
        return res.status(status).json(data);
      }
    } catch (error) {
      return res.status(500).json({ message: 'Token must be a valid token' });
    }
  }
}
