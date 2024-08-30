import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Omit<CreateUserDto, 'id, password'> {
  @IsOptional()
  email: string;

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  bio?: string;
}
