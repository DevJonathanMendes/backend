import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() data: Pick<CreateUserDto, 'username' | 'password'>) {
    return this.authService.signIn(data);
  }

  @Post('signup')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }
}
