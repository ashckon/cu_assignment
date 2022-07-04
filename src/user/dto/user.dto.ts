import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
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
  })
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  /* @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  }) */
  password: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isAdmin: boolean;
}

export class CreateUserDto extends PartialType(UserDto) {}

export class UpdateUserDto extends PartialType(UserDto) {}
