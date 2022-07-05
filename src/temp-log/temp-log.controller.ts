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
} from '@nestjs/common';
import { TempLogService } from './temp-log.service';
import { CreateTempLogDto, UpdateTempLogDto } from './dto/temp-log.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@root/user/entities/user.entity';
import { GetUser } from '@root/auth/get-user.decorator';
import { TempLogFilterDto } from './dto/temp-log-filter.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminUser } from '@root/auth/admin-user.decorator';

@ApiTags('TempLog')
@ApiBearerAuth()
@Controller('temp-logs')
@UseGuards(AuthGuard())
export class TempLogController {
  constructor(private readonly tempLogService: TempLogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new temperature log' })
  create(@Body() createTempLogDto: CreateTempLogDto, @GetUser() user: User) {
    return this.tempLogService.create(createTempLogDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all temp log data by Admin' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Admin rights required to retrieve all logs!',
  })
  findAllTempLogs(@AdminUser() isAdmin: boolean) {
    if (isAdmin) {
      return this.tempLogService.findAllTempLogs();
    }
  }

  @Get('/my-logs')
  @ApiOperation({
    summary: 'Retrieves all temp log data for a specific user',
    description:
      'This endpoint is used for returning all log data for a given user based on their access token provided Authorization header',
  })
  findAllMyLogs(@GetUser() user: User) {
    return this.tempLogService.findAllMyLogs(user);
  }

  @Get('/my-log-stats')
  @ApiOperation({
    summary: 'Statistical temp log data',
    description:
      'Retrieves highest, lowest, median and average of the temperature logs for a given user (logged in). It also returns statistical data whitin a specific date range.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Please specify both start and end date!',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Start date must be less than or equal the last log date!',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Start date cannot be greater than end date!',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No temp log found between the specified date range!',
  })
  getStatistics(@Query() filter: TempLogFilterDto, @GetUser() user: User) {
    return this.tempLogService.getStatisticalTempLogData(filter, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieves a temp log data by its Id' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Temp Log not found!',
  })
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.tempLogService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a temp log by its Id' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Temp Log not found!',
  })
  update(
    @Param('id') id: string,
    @Body() updateTempLogDto: UpdateTempLogDto,
    @GetUser() user: User,
  ) {
    return this.tempLogService.update(id, updateTempLogDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a temp log by its Id' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Temp Log not found!',
  })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.tempLogService.remove(id, user);
  }
}
