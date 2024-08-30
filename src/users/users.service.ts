import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(
    user: Partial<UserEntity>,
  ): Partial<UserEntity> & { token: string } {
    return {
      ...user,
      token: this.jwtService.sign({ ...user }),
    };
  }

  createUser(params: {
    data: CreateUserDto;
    select?: Prisma.UserSelect;
  }): Promise<Partial<UserEntity>> {
    const { data, select } = params;

    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        ...select,
      },
    });
  }

  findManyUser(
    params: { where?: Prisma.UserWhereInput } = {},
  ): Promise<Partial<UserEntity>[]> {
    const { where } = params;

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        password: false,
      },
    });
  }

  findUniqueUser(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<Partial<UserEntity>> {
    const { where, select } = params;

    return this.prisma.user.findUnique({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        ...select,
      },
    });
  }

  updateUser(params: {
    data: UpdateUserDto;
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }) {
    const { data, where, select } = params;

    return this.prisma.user.update({
      data,
      where,
      select: { id: true, ...select },
    });
  }

  deleteUser(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<Partial<UserEntity>> {
    const { where } = params;

    return this.prisma.user.delete({
      where,
      select: { id: true, username: true },
    });
  }
}
