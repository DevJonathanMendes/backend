import { IsOptional, IsString, Length } from 'class-validator';
// import { IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  // @IsStrongPassword() Mais recomendado.
  @Length(1, 255)
  password: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  surname: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  title: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  about: string;
}
