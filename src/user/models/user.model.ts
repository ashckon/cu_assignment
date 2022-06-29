import { IBaseEntity } from 'src/common/base';

export interface IUser extends IBaseEntity {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}
