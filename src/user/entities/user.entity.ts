import { Base } from 'src/common/base';
import { Column, Entity } from 'typeorm';
import { IUser } from '../models/user.model';

@Entity('users')
export class User extends Base implements IUser {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
