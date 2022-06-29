import { Module } from '@nestjs/common';
import { TempLogService } from './temp-log.service';
import { TempLogController } from './temp-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempLog } from './entities/temp-log.entity';

const TempLogRepository = TypeOrmModule.forFeature([TempLog]);
@Module({
  imports: [TempLogRepository],
  controllers: [TempLogController],
  providers: [TempLogService],
})
export class TempLogModule {}
