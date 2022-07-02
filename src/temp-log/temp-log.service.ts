import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(
    createTempLogDto: CreateTempLogDto,
    user: User,
  ): Promise<TempLog> {
    const { stationId } = createTempLogDto;

    // check if user has reported a temperature log less than a minute ago
    const userCachedLog = await this.cacheManager.get(user.id);
    if (userCachedLog !== undefined) {
      throw new HttpException(
        'You can only log a temperature once a minute',
        HttpStatus.BAD_REQUEST,
      );
    }

    const station = await this.stationService.findOne(stationId);
    const newTempLog = await this.tempLogRepository
      .create({ ...createTempLogDto, user, station })
      .save();

    // caching the log for one minute
    await this.cacheManager.set(user.id, new Date(), { ttl: 60 });

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
