import { PartialType } from '@nestjs/mapped-types';

export class TempLogDto {}

export class CreateTempLogDto extends PartialType(TempLogDto) {}

export class UpdateTempLogDto extends PartialType(TempLogDto) {}
