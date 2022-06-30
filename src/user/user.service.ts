import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(createUserDto).save();
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound) {
      throw new NotFoundException(`User not found`);
    }
    return userFound;
  }

  /* update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  } */

  async remove(id: string) {
    const userfound = await this.findOne(id);
    if (userfound) {
      await this.userRepository.delete(id);
    }
  }
}
