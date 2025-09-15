import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UsersEntity } from '../entities/users.entity';

export class ReadUserDto implements Omit<UsersEntity, 'id' | 'name'> {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  password: string;
}
