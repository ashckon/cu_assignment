import { Module } from '@nestjs/common';
import { TempLogService } from './temp-log.service';
import { TempLogController } from './temp-log.controller';

@Module({
  controllers: [TempLogController],
  providers: [TempLogService]
})
export class TempLogModule {}
