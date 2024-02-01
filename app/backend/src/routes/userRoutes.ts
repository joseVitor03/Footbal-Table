import { Request, Response, Router } from 'express';
import UserController from '../controller/User.controller';
import Validate from '../middlewares/ValidateLogin';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post(
  '/login',
  Validate
    .emailAndPassword,
  (req: Request, res: Response) => userController.login(req, res),
);

userRoutes.get(
  '/login/role',
  Validate.validToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default userRoutes;
