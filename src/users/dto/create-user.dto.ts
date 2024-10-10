import {
  IsEmail,
  IsLowercase,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { Transform } from 'class-transformer';

export class CreateUserDto
  implements Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsEmail()
  @IsLowercase()
  @Length(1, 255)
  @Transform((e) => {
    console.log(e);
    return e.value;
  })
  email: string;

  @IsString()
  @IsLowercase()
  @Length(1, 255)
  @Matches(/^\S*$/, { message: 'username must not contain spaces' })
  username: string;

  // @IsStrongPassword() // Mais recomendado.
  @IsString()
  @Length(1, 255)
  password: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  bio: string | null;
}
