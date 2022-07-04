import { CacheModule, Module } from '@nestjs/common';
import { TempLogService } from './temp-log.service';
import { TempLogController } from './temp-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempLog } from './entities/temp-log.entity';
import { StationModule } from '@root/station/station.module';
import { CustomFunction } from '@root/common/utils';
import { StatsModule } from '@root/utils/stats/stats.module';
import { UserModule } from '@root/user/user.module';

const TempLogRepository = TypeOrmModule.forFeature([TempLog]);
const MemoryCacheModule = CacheModule.register();
@Module({
  imports: [
    TempLogRepository,
    StationModule,
    MemoryCacheModule,
    CustomFunction,
    StatsModule,
    UserModule,
  ],
  controllers: [TempLogController],
  providers: [TempLogService],
})
export class TempLogModule {}
