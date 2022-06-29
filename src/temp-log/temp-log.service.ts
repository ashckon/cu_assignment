import { Injectable } from '@nestjs/common';
import { CreateTempLogDto } from './dto/temp-log.dto';
import { UpdateTempLogDto } from './dto/update-temp-log.dto';

@Injectable()
export class TempLogService {
  create(createTempLogDto: CreateTempLogDto) {
    return 'This action adds a new tempLog';
  }

  findAll() {
    return `This action returns all tempLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tempLog`;
  }

  update(id: number, updateTempLogDto: UpdateTempLogDto) {
    return `This action updates a #${id} tempLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} tempLog`;
  }
}
