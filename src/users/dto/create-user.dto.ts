import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { UsersEntity } from '../entities/users.entity';

export class CreateUserDto implements Omit<UsersEntity, 'id'> {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  password: string;
}
