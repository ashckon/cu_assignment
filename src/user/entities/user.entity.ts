import { TempLog } from '@root/temp-log/entities/temp-log.entity';
import { Exclude } from 'class-transformer';
import { Base } from 'src/common/base';
import { Column, Entity, OneToMany } from 'typeorm';
import { IUser } from '../models/user.model';

@Entity('users')
export class User extends Base implements IUser {
  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => TempLog, (tempLog: TempLog) => tempLog.user)
  tempLogs: TempLog[];
}
