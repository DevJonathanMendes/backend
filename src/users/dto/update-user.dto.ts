import {
  IsEmail,
  IsLowercase,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto
  implements Omit<UserEntity, 'id' | 'password' | 'createdAt' | 'updatedAt'>
{
  @IsEmail()
  @IsLowercase()
  @Length(1, 255)
  @IsOptional()
  email: string;

  @IsString()
  @IsLowercase()
  @Length(1, 255)
  @Matches(/^\S*$/, { message: 'username must not contain spaces' })
  @IsOptional()
  username: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  name: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  bio: string | null;
}
