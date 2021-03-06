import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IStation } from '../models/station.model';

export class StationDto implements IStation {
  @ApiProperty({ description: 'Name of the station' })
  @IsString()
  name: string;
}

export class CreateStationDto extends PartialType(StationDto) {}

export class UpdateStationDto extends PartialType(StationDto) {}
