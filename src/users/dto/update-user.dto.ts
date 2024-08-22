import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  id: number;

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  surname: string;

  @IsOptional()
  title: string;

  @IsOptional()
  about: string;
}
