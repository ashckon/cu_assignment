import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTempLogDto, UpdateTempLogDto } from './dto/temp-log.dto';
import { TempLog } from './entities/temp-log.entity';

@Injectable()
export class TempLogService {
  constructor(
    @InjectRepository(TempLog)
    private tempLogRepository: Repository<TempLog>,
  ) {}

  async create(createTempLogDto: CreateTempLogDto): Promise<TempLog> {
    const newTempLog = await this.tempLogRepository
      .create(createTempLogDto)
      .save();
    return newTempLog;
  }

  async findAll(): Promise<TempLog[]> {
    return await this.tempLogRepository.find();
  }

  async findOne(id: string): Promise<TempLog> {
    const tempLogFound = await this.tempLogRepository.findOneBy({ id });
    if (!tempLogFound) {
      throw new NotFoundException(`Temp log not found`);
    }
    return tempLogFound;
  }

  /* update(id: number, updateTempLogDto: UpdateTempLogDto) {
    return `This action updates a #${id} tempLog`;
  } */

  async remove(id: string) {
    const tempLogfound = await this.findOne(id);
    if (tempLogfound) {
      await this.tempLogRepository.delete(id);
    }
  }
}
