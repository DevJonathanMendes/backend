import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    data: Pick<CreateUserDto, 'username' | 'password'>,
  ): Promise<Partial<UserEntity> & { token: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { username: data.username },
    });

    if (!user) {
      throw new BadRequestException(['username does not exist']);
    }

    if (user.password !== data.password) {
      throw new UnauthorizedException(['incorrect password']);
    }

    return new TokenEntity({
      ...user,
      token: this.jwtService.sign({ ...user }),
    });
  }

  async signUp(data: CreateUserDto) {
    const { username, email } = data;
    const exists = await this.prismaService.user.findMany({
      where: { OR: [{ username }, { email }] },
      select: { username: true, email: true },
    });

    const errors = exists.reduce((acc: string[], user) => {
      if (user.username === username) acc.push('username already exists');
      if (user.email === email) acc.push('email already exists');
      return acc;
    }, []);
    if (errors.length) throw new BadRequestException(errors);

    const user = await this.prismaService.user.create({ data });

    return new TokenEntity({
      ...user,
      token: this.jwtService.sign({ ...user }),
    });
  }
}
