import { PartialType } from '@nestjs/mapped-types';
import { IStation } from 'src/station/models/station.model';
import { IUser } from 'src/user/models/user.model';
import { IsNumber, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { ITempLog } from '../models/temp-log.model';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { StationDto } from 'src/station/dto/station.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class TempLogDto implements ITempLog {
  @IsNumber()
  @ApiProperty()
  temperature: number;

  @ValidateNested()
  @ApiProperty({ type: StationDto })
  station: StationDto;

  @ValidateNested()
  @ApiProperty({ type: UserDto })
  user: UserDto;
}

export class CreateTempLogDto extends PartialType(
  OmitType(TempLogDto, ['station', 'user']),
) {
  @ApiProperty()
  @IsUUID()
  stationId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId: string;
}

export class UpdateTempLogDto extends PartialType(TempLogDto) {}
