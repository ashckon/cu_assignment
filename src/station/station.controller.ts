import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto, UpdateStationDto } from './dto/station.dto';

@Controller('stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationService.create(createStationDto);
  }

  @Get()
  findAll() {
    return this.stationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationService.findOne(id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return this.stationService.update(+id, updateStationDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationService.remove(id);
  }
}
