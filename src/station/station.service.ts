import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      throw new NotFoundException(`Station not found`);
    }
    return stationFound;
  }

  /* update(id: number, updateStationDto: UpdateStationDto) {
    return `This action updates a #${id} station`;
  } */

  async remove(id: string) {
    const stationfound = await this.findOne(id);
    if (stationfound) {
      await this.stationRepository.delete(id);
    }
  }
}
