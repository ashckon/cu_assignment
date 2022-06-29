import { Base } from 'src/common/base';
import { Station } from 'src/station/entities/station.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity } from 'typeorm';
import { ITempLog } from '../models/temp-log.model';

@Entity('temp-logs')
export class TempLog extends Base implements ITempLog {
  @Column()
  temperature: number;

  @Column()
  station: Station;

  @Column()
  user: User;
}
