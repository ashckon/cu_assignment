import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto, UpdateStationDto } from './dto/station.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminUser } from '@root/auth/admin-user.decorator';

@ApiTags('Station')
@ApiBearerAuth()
@Controller('stations')
@UseGuards(AuthGuard())
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  create(
    @Body() createStationDto: CreateStationDto,
    @AdminUser() isAdmin: boolean,
  ) {
    if (isAdmin) {
      return this.stationService.create(createStationDto);
    }
  }

  @Get()
  findAll() {
    return this.stationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
    @AdminUser() isAdmin: boolean,
  ) {
    if (isAdmin) {
      return this.stationService.update(id, updateStationDto);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AdminUser() isAdmin: boolean) {
    if (isAdmin) {
      return this.stationService.remove(id);
    }
  }
}
