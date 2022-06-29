import { PartialType } from "@nestjs/mapped-types";

export class StationDto {}

export class CreateStationDto extends PartialType(StationDto) {
}

export class UpdateStationDto extends PartialType(StationDto) {
}