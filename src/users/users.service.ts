import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const user = await this.usersRepository.findOneBy({ email: createUserDto.email });

    if (user) throw new ConflictException(['email already exists']);

    return this.usersRepository.save(createUserDto);
  }

  findOneUserById(id: number): Promise<UsersEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneUserByEmail(email: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
