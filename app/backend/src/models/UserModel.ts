import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUsers } from '../Interfaces/IUsers';
import { IUserModel } from '../Interfaces/IUsersModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;
  async login(data: { email: string }):
  Promise<IUsers | null> {
    const { email } = data;
    const user = await this.model.findOne({ where: { email } });
    if (user) {
      return user;
    }
    return null;
  }

  async getRole(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
