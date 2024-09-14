import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(params: {
    data: CreateUserDto;
    select?: Prisma.UserSelect;
  }): Promise<UserEntity> {
    const { data, select } = params;

    await this.existsUsernameOrEmail(data);

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

  async updateUser(params: {
    data: UpdateUserDto & { id: number };
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }) {
    const { data, where, select } = params;

    await this.existsUsernameOrEmail(data);

    return this.prisma.user.update({ data, where, select });
  }

  deleteUser(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<UserEntity> {
    const { where, select } = params;

    return this.prisma.user.delete({ where, select });
  }

  private async existsUsernameOrEmail(data: Partial<UserEntity>) {
    const { id, username, email } = data;
    const conditions: Partial<UserEntity>[] = [];

    username && conditions.push({ username });
    email && conditions.push({ email });

    if (conditions.length) {
      const exists = await this.findManyUser({
        where: { OR: conditions },
        select: { id: true, username: true, email: true },
      });

      const errors = exists.reduce((acc: string[], user) => {
        if (user.id !== id && user.username === username)
          acc.push('username already exists');
        if (user.id !== id && user.email === email)
          acc.push('email already exists');

        return acc;
      }, []);

      if (errors.length) throw new BadRequestException(errors);
    }
  }
}
