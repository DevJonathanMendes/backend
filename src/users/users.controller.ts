import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() data: CreateUserDto,
  ): Promise<Partial<UserEntity> & { token: string }> {
    const user = await this.usersService.findUniqueUser({
      where: { username: data.username },
      select: { password: true },
    });

    if (!user) {
      throw new BadRequestException(['username does not exist']);
    }

    if (data.password !== user.password) {
      throw new UnauthorizedException(['incorrect password']);
    }

    delete user.password;
    return this.usersService.createToken(user);
  }

  @Public()
  @Post('signup')
  async signUp(
    @Body() data: CreateUserDto,
  ): Promise<Partial<UserEntity> & { token: string }> {
    const usernameExists = await this.usersService.findUniqueUser({
      where: { username: data.username },
    });

    if (usernameExists) {
      throw new BadRequestException('username already exists');
    }

    const user = await this.usersService.createUser({ data });
    return this.usersService.createToken(user);
  }

  @Get()
  findMany(): Promise<Omit<UserEntity, 'password'>[]> {
    return this.usersService.findManyUser();
  }

  @Get(':id')
  findUniqueById(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Partial<UserEntity>> {
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
