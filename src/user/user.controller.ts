import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminUser } from '@root/auth/admin-user.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @AdminUser() isAdmin: boolean) {
    if (isAdmin) {
      return this.userService.create(createUserDto);
    }
  }

  @Get()
  findAll(@AdminUser() isAdmin: boolean) {
    if (isAdmin) {
      return this.userService.findAll();
    }
  }

  @Get(':id')
  findbyId(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
