import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
// import { IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @Matches(/^\S*$/, { message: 'email must not contain spaces' })
  @Length(1, 255)
  email: string;

  @IsString()
  @Matches(/^\S*$/, { message: 'username must not contain spaces' })
  @Length(1, 255)
  username: string;

  // @IsStrongPassword() // Mais recomendado.
  @IsString()
  @Length(1, 255)
  password: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  bio?: string;
}
