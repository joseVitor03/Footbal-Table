import { Request, Response, Router } from 'express';
import UserController from '../controller/User.controller';
import ValidateLogin from '../middlewares/ValidateLogin';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post(
  '/login',
  ValidateLogin
    .emailAndPassword,
  (req: Request, res: Response) => userController.login(req, res),
);

export default userRoutes;
