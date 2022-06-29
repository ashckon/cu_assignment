import { Base } from 'src/common/base';
import { Column, Entity } from 'typeorm';
import { IStation } from '../models/station.model';

@Entity('stations')
export class Station extends Base implements IStation {
  @Column()
  name: string;
}
