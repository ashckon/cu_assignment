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
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import { TempLogService } from './temp-log.service';
import { CreateTempLogDto, UpdateTempLogDto } from './dto/temp-log.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@root/user/entities/user.entity';
import { GetUser } from '@root/auth/get-user.decorator';

@Controller('temp-logs')
@UseGuards(AuthGuard())
export class TempLogController {
  constructor(private readonly tempLogService: TempLogService) {}

  @Post()
  create(@Body() createTempLogDto: CreateTempLogDto, @GetUser() user: User) {
    return this.tempLogService.create(createTempLogDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.tempLogService.findAll(user);
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
