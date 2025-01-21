import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneUserByEmail(createUserDto.email);

    if (!user || !(await bcrypt.compare(createUserDto.password, user.password)))
      throw new UnauthorizedException(['Invalid credentials']);

    const { id, email } = user;
    return {
      id,
      email,
      accessToken: this.jwtService.sign({ id, email }, { expiresIn: '5min' }),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return this.usersService.createUser(createUserDto);
  }
}
