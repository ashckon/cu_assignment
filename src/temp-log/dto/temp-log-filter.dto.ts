import { IsDate, IsOptional } from 'class-validator';

export class TempLogFilterDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
