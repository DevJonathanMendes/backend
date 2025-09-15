import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersEntity } from '../users/entities/users.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ReadUserDto } from '../users/dto/read-user.dto';

@Public()
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: UsersEntity })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatusCode.Ok)
  @Post('sign-in')
  signIn(@Body() readUserDto: ReadUserDto) {
    return this.authService.signIn(readUserDto);
  }

  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
