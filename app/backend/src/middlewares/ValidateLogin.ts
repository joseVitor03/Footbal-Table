import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET ?? 'jwt_secret';

export default class Validate {
  public static emailAndPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  public static async validToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const [, realToken] = authorization.split(' ');
      jwt.verify(realToken, secretKey);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
