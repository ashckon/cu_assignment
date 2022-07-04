import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TempLogService } from './temp-log.service';
import { CreateTempLogDto, UpdateTempLogDto } from './dto/temp-log.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@root/user/entities/user.entity';
import { GetUser } from '@root/auth/get-user.decorator';
import { TempLogFilterDto } from './dto/temp-log-filter.dto';

@Controller('temp-logs')
@UseGuards(AuthGuard())
export class TempLogController {
  constructor(private readonly tempLogService: TempLogService) {}

  @Post()
  create(@Body() createTempLogDto: CreateTempLogDto, @GetUser() user: User) {
    return this.tempLogService.create(createTempLogDto, user);
  }

  @Get()
  findAllTempLogs(@GetUser() user: User) {
    if (!user.isAdmin) {
      throw new HttpException(
        'Admin rights required to retrieve all logs!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.tempLogService.findAllTempLogs();
  }

  @Get('/my-logs')
  findAllMyLogs(@GetUser() user: User) {
    return this.tempLogService.findAllMyLogs(user);
  }

  @Get('/my-log-stats')
  getStatistics(@Query() filter: TempLogFilterDto, @GetUser() user: User) {
    return this.tempLogService.getStatisticalTempLogData(filter, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.tempLogService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTempLogDto: UpdateTempLogDto,
    @GetUser() user: User,
  ) {
    return this.tempLogService.update(id, updateTempLogDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.tempLogService.remove(id, user);
  }
}
