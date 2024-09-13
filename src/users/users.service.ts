import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(params: {
    data: CreateUserDto;
    select?: Prisma.UserSelect;
  }): Promise<UserEntity> {
    const { data, select } = params;

    return this.prisma.user.create({ data, select });
  }

  findManyUser(params: {
    where?: Prisma.UserWhereInput;
    select: Prisma.UserSelect;
  }): Promise<UserEntity[]> {
    const { where, select } = params;

    return this.prisma.user.findMany({ where, select });
  }

  findUniqueUser(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<UserEntity | null> {
    const { where, select } = params;

    return this.prisma.user.findUnique({ where, select });
  }

  updateUser(params: {
    data: UpdateUserDto;
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }) {
    const { data, where, select } = params;

    return this.prisma.user.update({ data, where, select });
  }

  deleteUser(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<UserEntity> {
    const { where, select } = params;

    return this.prisma.user.delete({ where, select });
  }
}
