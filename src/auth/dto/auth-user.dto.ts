import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';

export class AuthUserDto
  implements Pick<UserEntity, 'username' | 'password'>
{
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
