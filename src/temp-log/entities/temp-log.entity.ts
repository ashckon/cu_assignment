import { Base } from 'src/common/base';
import { Station } from 'src/station/entities/station.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ITempLog } from '../models/temp-log.model';

@Entity('temp-logs')
export class TempLog extends Base implements ITempLog {
  @Column()
  temperature: number;

  @ManyToOne(() => Station, (station: Station) => station.tempLogs, {
    eager: true,
  })
  @JoinColumn()
  station: Station;

  @ManyToOne(() => User, (user: User) => user.tempLogs, { eager: true })
  @JoinColumn()
  user: User;
}
