import { Module } from '@nestjs/common';
import { TempLogService } from './temp-log.service';
import { TempLogController } from './temp-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempLog } from './entities/temp-log.entity';
import { StationModule } from '@root/station/station.module';

const TempLogRepository = TypeOrmModule.forFeature([TempLog]);
@Module({
  imports: [TempLogRepository, StationModule],
  controllers: [TempLogController],
  providers: [TempLogService],
})
export class TempLogModule {}
