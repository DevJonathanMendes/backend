import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSelectEntity } from './entities/user-select.entity';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly defaultSelect = new UserSelectEntity();

  @Get()
  findMany(): Promise<Partial<UserEntity>[]> {
    return this.usersService.findManyUser({ select: this.defaultSelect });
  }

  @Get(':id')
  async findUniqueById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.findUniqueUser({
      where: { id },
      select: this.defaultSelect,
    });

    if (!user) throw new BadRequestException(['id does not exist']);

    return user;
  }

  @Get('username/:username')
  async findUniqueByUsername(
    @Param('username') username: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.findUniqueUser({
      where: { username },
      select: this.defaultSelect,
    });

    if (!user) throw new BadRequestException(['username does not exist']);

    return user;
  }

  @Patch(':id')
  async update(
    @Req() req: Request & { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<Partial<UserEntity>> {
    if (id !== req?.user.id) throw new UnauthorizedException(['not allowed']);

    return this.usersService.updateUser({
      data: { ...data, id },
      where: { id },
      select: this.defaultSelect,
    });
  }

  @Delete(':id')
  deleteById(
    @Req() req: Request & { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<UserEntity>> {
    if (id !== req?.user.id) throw new UnauthorizedException(['not allowed']);

    return this.usersService.deleteUser({
      where: { id },
      select: this.defaultSelect,
    });
  }
}
