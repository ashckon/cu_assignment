import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StationService } from '@root/station/station.service';
import { User } from '@root/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTempLogDto, UpdateTempLogDto } from './dto/temp-log.dto';
import { TempLog } from './entities/temp-log.entity';

@Injectable()
export class TempLogService {
  constructor(
    @InjectRepository(TempLog)
    private readonly tempLogRepository: Repository<TempLog>,
    private readonly stationService: StationService,
  ) {}

  async create(
    createTempLogDto: CreateTempLogDto,
    user: User,
  ): Promise<TempLog> {
    const { stationId } = createTempLogDto;
    console.log(stationId);
    const station = await this.stationService.findOne(stationId);
    const newTempLog = await this.tempLogRepository
      .create({ ...createTempLogDto, user, station })
      .save();
    return newTempLog;
  }

  async findAll(user: User): Promise<TempLog[]> {
    const tempLogs = await this.tempLogRepository.findBy({
      user: { id: user.id },
    });
    return tempLogs;
  }

  async findOne(id: string, user: User): Promise<TempLog> {
    const tempLogFound = await this.tempLogRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!tempLogFound) {
      throw new HttpException(`TempLog not found`, HttpStatus.NOT_FOUND);
    }
    return tempLogFound;
  }

  async update(
    id: string,
    updateTempLogDto: UpdateTempLogDto,
    user: User,
  ): Promise<TempLog> {
    const tempLogFound = await this.findOne(id, user);

    const { temperature } = updateTempLogDto;
    tempLogFound.temperature = temperature;
    await tempLogFound.save();

    // return this.tempLogRepository.update(id, updateTempLogDto);
    return tempLogFound;
  }

  async remove(id: string, user: User) {
    const tempLogfound = await this.findOne(id, user);
    if (tempLogfound) {
      await this.tempLogRepository.remove(tempLogfound);
    }
    throw new HttpException('TempLog deleted!', HttpStatus.OK);
  }
}
