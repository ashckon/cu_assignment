import { TempLog } from '@root/temp-log/entities/temp-log.entity';
import { Base } from 'src/common/base';
import { Column, Entity, OneToMany } from 'typeorm';
import { IStation } from '../models/station.model';

@Entity('stations')
export class Station extends Base implements IStation {
  @Column()
  name: string;

  @OneToMany(() => TempLog, (tempLog: TempLog) => tempLog.station)
  tempLogs: TempLog[];
}
