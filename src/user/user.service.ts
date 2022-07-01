import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async findByUsername(username: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ username });
    if (!userFound) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  /* update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  } */

  async remove(id: string) {
    const userfound = await this.findById(id);
    if (userfound) {
      await this.userRepository.remove(userfound);
    }
  }
}
