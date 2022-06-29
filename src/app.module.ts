import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationModule } from './station/station.module';
import { UserModule } from './user/user.module';
import { TempLogModule } from './temp-log/temp-log.module';

@Module({
  imports: [StationModule, UserModule, TempLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
