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
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { SelectFieldsUser } from './dto/select-user.dto';
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
    @Body() data: Pick<CreateUserDto, 'username' | 'password'>,
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
    const { username, email } = data;
    const exists = await this.usersService.findManyUser({
      where: { OR: [{ username }, { email }] },
    });

    const errors = exists.reduce((acc: string[], user) => {
      if (user.username === username) acc.push('username already exists');
      if (user.email === email) acc.push('email already exists');
      return acc;
    }, []);
    if (errors.length) throw new BadRequestException(errors);

    const user = await this.usersService.createUser({ data });
    return this.usersService.createToken(user);
  }

  @Get()
  findMany(): Promise<Partial<UserEntity>[]> {
    return this.usersService.findManyUser();
  }

  @Public()
  @Get(':id')
  async findUniqueById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SelectFieldsUser,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.findUniqueUser({
      where: { id },
      select: this.createFindUniqueSelect(query),
    });

    if (!user) throw new BadRequestException(['id does not exist']);

    return user;
  }

  @Public()
  @Get('username/:username')
  async findUniqueByUsername(
    @Param('username') username: string,
    @Query() query: SelectFieldsUser,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.findUniqueUser({
      where: { username },
      select: this.createFindUniqueSelect(query),
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
    const select = this.createUpdateSelect(data);
    const conditions: Partial<UpdateUserDto>[] = [];

    username && conditions.push({ username });
    email && conditions.push({ email });

    if (conditions.length) {
      const exists = await this.usersService.findManyUser({
        where: { OR: conditions },
        select,
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
      select,
    });
  }

  @Delete(':id')
  deleteById(
    @Req() req: Request & { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<UserEntity>> {
    if (id !== req?.user.id) throw new UnauthorizedException(['not allowed']);

    return this.usersService.deleteUser({ where: { id } });
  }

  private createFindUniqueSelect(select: SelectFieldsUser) {
    if (typeof select !== 'object' || select === null) return select;

    delete select.id;

    return Object.keys(select).reduce((acc, key) => {
      acc[key] = select[key] === 'true';
      return acc;
    }, {} as SelectFieldsUser);
  }

  private createUpdateSelect(data: Partial<UserEntity>): SelectFieldsUser {
    return Object.keys(data).reduce((selectFields, key) => {
      if (data[key as keyof UserEntity] !== undefined) {
        selectFields[key as keyof UserEntity] = true;
      }
      return selectFields;
    }, {} as SelectFieldsUser);
  }
}
