import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TempLogService } from './temp-log.service';
import { CreateTempLogDto, UpdateTempLogDto } from './dto/temp-log.dto';

@Controller('temp-logs')
export class TempLogController {
  constructor(private readonly tempLogService: TempLogService) {}

  @Post()
  create(@Body() createTempLogDto: CreateTempLogDto) {
    return this.tempLogService.create(createTempLogDto);
  }

  @Get()
  findAll() {
    return this.tempLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tempLogService.findOne(id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateTempLogDto: UpdateTempLogDto) {
    return this.tempLogService.update(+id, updateTempLogDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tempLogService.remove(id);
  }
}
