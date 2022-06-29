import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IUser } from '../models/user.model';

export class UserDto implements IUser {
  @IsString()
  @ApiProperty()
  firstname: string;

  @IsString()
  @ApiProperty()
  lastname: string;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class CreateUserDto extends PartialType(UserDto) {}

export class UpdateUserDto extends PartialType(UserDto) {}
