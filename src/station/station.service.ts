import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@root/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateStationDto, UpdateStationDto } from './dto/station.dto';
import { Station } from './entities/station.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async create(createStationDto: CreateStationDto): Promise<Station> {
    const newStation = await this.stationRepository
      .create(createStationDto)
      .save();
    return newStation;
  }

  async findAll(): Promise<Station[]> {
    return await this.stationRepository.find();
  }

  async findOne(id: string): Promise<Station> {
    const stationFound = await this.stationRepository.findOneBy({ id });
    if (!stationFound) {
      throw new HttpException(`Station not found`, HttpStatus.NOT_FOUND);
    }
    return stationFound;
  }

  async update(id: string, updateStationDto: UpdateStationDto) {
    const { name } = updateStationDto;
    const station = await this.findOne(id);
    station.name = name;
    await station.save();
    return station;
  }

  async remove(id: string) {
    const stationfound = await this.findOne(id);
    if (stationfound) {
      await this.stationRepository.remove(stationfound);
    }
    throw new HttpException('Station deleted!', HttpStatus.OK);
  }
}
