import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersService.findUniqueUser({
      where: { username: data.username },
      select: { username: true },
    });

    if (user) {
      throw new BadRequestException(['username already exists']);
    }

    return this.usersService.createUser(data);
  }

  @Get()
  findMany(): Promise<Omit<UserEntity, 'password'>[]> {
    return this.usersService.findManyUser();
  }

  @Get(':id')
  findUniqueById(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.usersService.findUniqueUser({ where: { id } });
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser({ data, where: { id } });
  }

  @Delete(':id')
  deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.usersService.deleteUser({ where: { id } });
  }
}
