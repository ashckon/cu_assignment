import { IBaseEntity } from 'src/common/base';
import { IStation } from 'src/station/models/station.model';
import { IUser } from 'src/user/models/user.model';

export interface ITempLog extends IBaseEntity {
  temperature: number;
  station: IStation;
  user: IUser;
}
