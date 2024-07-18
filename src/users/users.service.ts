import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({ data });
  }

  findManyUser(): Promise<Omit<UserEntity, 'password'>[]> {
    return this.prisma.user.findMany({
      select: { id: true, username: true, password: false },
    });
  }

  findUniqueUser(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<Omit<UserEntity, 'password'>> {
    const { where, select } = params;

    return this.prisma.user.findUnique({
      where,
      select: { id: true, username: true, ...select },
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
      select: { id: true, username: true, ...select },
    });
  }

  deleteUser(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<Omit<UserEntity, 'password'>> {
    const { where } = params;

    return this.prisma.user.delete({
      where,
      select: { id: true, username: true },
    });
  }
}
