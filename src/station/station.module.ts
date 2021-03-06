import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';

const StationRepository = TypeOrmModule.forFeature([Station]);
@Module({
  imports: [StationRepository],
  controllers: [StationController],
  providers: [StationService],
  exports: [StationService],
})
export class StationModule {}
