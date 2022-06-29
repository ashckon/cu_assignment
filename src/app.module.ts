import { Module } from '@nestjs/common';
import { StationModule } from './station/station.module';
import { UserModule } from './user/user.module';
import { TempLogModule } from './temp-log/temp-log.module';

@Module({
  imports: [StationModule, UserModule, TempLogModule],
})
export class AppModule {}
