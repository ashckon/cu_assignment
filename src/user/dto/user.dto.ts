import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IUser } from '../models/user.model';

export class UserDto implements IUser {
  @ApiPropertyOptional({
    description: 'First name for the user',
    example: 'Stephen',
  })
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiPropertyOptional({
    description: 'Last name for the user',
    example: 'Strange',
  })
  @IsString()
  @IsOptional()
  lastname: string;

  @ApiProperty({
    description: 'Username for the user',
    example: 'stephstrange',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'Ss@123',
  })
  @IsString()
  password: string;
}

export class CreateUserDto extends PartialType(UserDto) {}

export class UpdateUserDto extends PartialType(UserDto) {}
