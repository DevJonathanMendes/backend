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
import { SelectFieldsUser } from './dto/select-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly defaultSelect = new SelectFieldsUser();

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
  ) {
    if (id !== req?.user.id) throw new UnauthorizedException(['not allowed']);

    const { username, email } = data;
    const conditions: Partial<UpdateUserDto>[] = [];

    username && conditions.push({ username });
    email && conditions.push({ email });

    if (conditions.length) {
      const exists = await this.usersService.findManyUser({
        where: { OR: conditions },
        select: this.defaultSelect,
      });

      const errors = exists.reduce((acc: string[], user) => {
        if (user.username === username) acc.push('username already exists');
        if (user.email === email) acc.push('email already exists');
        return acc;
      }, []);
      if (errors.length) throw new BadRequestException(errors);
    }

    return this.usersService.updateUser({
      data,
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
