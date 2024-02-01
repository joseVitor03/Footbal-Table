import { IUsers } from './IUsers';

export interface IUserModel {
  login(data: { email: string, password: string }): Promise<IUsers | null>
  getRole(email: IUsers['email']): Promise<IUsers | null>
}
