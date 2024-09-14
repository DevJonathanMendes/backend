import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserTokenEntity } from './entities/token-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: AuthUserDto): Promise<UserTokenEntity> {
    const user = await this.usersService.findUniqueUser({
      where: { username: data.username },
    });

    if (!user) {
      throw new BadRequestException(['username does not exist']);
    }

    if (user.password !== this.passwordHash(data.password)) {
      throw new UnauthorizedException(['incorrect password']);
    }

    return new UserTokenEntity({
      ...user,
      token: this.jwtService.sign({ ...user }),
    });
  }

  async signUp(data: CreateUserDto): Promise<UserTokenEntity> {
    data.password = this.passwordHash(data.password);

    const user = await this.usersService.createUser({ data });

    return new UserTokenEntity({
      ...user,
      token: this.jwtService.sign({ ...user }),
    });
  }

  private passwordHash(password: string): string {
    return createHash('sha256')
      .update(password + process.env.JWT_SECRET)
      .digest('hex');
  }
}
