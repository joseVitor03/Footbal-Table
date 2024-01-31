import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../utils/mapStatusHTTP';
import UserModel from '../models/UserModel';

const keySecret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  async login({ email, password }: { email: string, password: string })
    :Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.login({ email });
    if (user) {
      const isValid = await bcryptjs.compare(password, user.password);
      if (!isValid) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const payload = { email: user.email, password: user.password };
      const token = jwt.sign(payload, keySecret);
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }
}
