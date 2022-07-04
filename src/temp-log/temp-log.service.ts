import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import moment from 'moment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@root/user/entities/user.entity';
import { UserService } from '@root/user/user.service';
import { StatsService } from '@root/utils/stats/stats.service';
import { StationService } from '@root/station/station.service';
import { TempLog } from './entities/temp-log.entity';
import { LogStats } from '@root/utils/stats/stats.model';
import { TempLogFilterDto } from './dto/temp-log-filter.dto';
import { CreateTempLogDto, UpdateTempLogDto } from './dto/temp-log.dto';

@Injectable()
export class TempLogService {
  constructor(
    @InjectRepository(TempLog)
    private readonly tempLogRepository: Repository<TempLog>,
    private readonly stationService: StationService,
    private readonly userService: UserService,
    private readonly statsService: StatsService,
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

  async findAllTempLogs(): Promise<TempLog[]> {
    const tempLogs = await this.tempLogRepository.find({
      order: { createdAt: 'ASC' },
    });
    return tempLogs;
  }

  async findAllMyLogs(user: User): Promise<TempLog[]> {
    const tempLogs = await this.tempLogRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'ASC' },
    });
    return tempLogs;
  }

  async getStatisticalTempLogData(
    filter: TempLogFilterDto,
    user: User,
  ): Promise<LogStats> {
    let tempLogs = await this.findAllMyLogs(user);
    if (tempLogs.length) {
      // find templogs within the provided date range

      const { startDate, endDate } = filter;
      if (Object.keys(filter).length) {
        // validation: both start and end dates must be provided
        if (
          !Object.keys(filter).includes('startDate') ||
          !Object.keys(filter).includes('endDate')
        ) {
          throw new HttpException(
            'Please specify both start and end date!',
            HttpStatus.BAD_REQUEST,
          );
        }

        // validation: start date cannot be greater than the date of user's last log

        if (
          moment(startDate).isAfter(
            moment(tempLogs[tempLogs.length - 1].createdAt),
          )
        ) {
          throw new HttpException(
            'Start date must be less than or equal the last log date!',
            HttpStatus.BAD_REQUEST,
          );
        }

        // validation: start date cannot be greater than end date
        if (moment(startDate).isAfter(moment(endDate))) {
          throw new HttpException(
            'Start date cannot be greater than end date!',
            HttpStatus.BAD_REQUEST,
          );
        }

        // return temp logs within the provided range
        const filteredTempLogs = tempLogs.filter((templog) =>
          moment(templog.createdAt)
            .utc()
            .isBetween(
              moment(startDate).utc(),
              moment(endDate).utc(),
              'days',
              '[]',
            ),
        );

        if (filteredTempLogs.length === 0) {
          throw new HttpException(
            'No temp log found between the specified date range!',
            HttpStatus.NOT_FOUND,
          );
        }
        tempLogs = filteredTempLogs;
      }

      const temperatures: Array<number> = [];
      await Promise.all(
        tempLogs.map(async (templog) => {
          temperatures.push(templog.temperature);
        }),
      );
      temperatures.sort((a, b) => a - b);

      return this.statsService.stats(temperatures);
    }
  }

  async findOne(id: string, user: User): Promise<TempLog> {
    if (user.isAdmin) {
      const tempLogFound = await this.tempLogRepository.findOneBy({ id });
      return tempLogFound;
    } else {
      const tempLogFound = await this.tempLogRepository.findOneBy({
        id,
        user: { id: user.id },
      });

      if (!tempLogFound) {
        throw new HttpException(`TempLog not found`, HttpStatus.NOT_FOUND);
      }
      return tempLogFound;
    }
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
