import { PartialType } from '@nestjs/mapped-types';

export class UserDto {}

export class CreateUserDto extends PartialType(UserDto) {}

export class UpdateUserDto extends PartialType(UserDto) {}
