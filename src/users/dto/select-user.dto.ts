import { IsBooleanString, IsOptional } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class SelectFieldsUser
  implements Record<keyof Omit<UserEntity, 'password'>, boolean>
{
  @IsBooleanString()
  @IsOptional()
  id: boolean = true;

  @IsBooleanString()
  @IsOptional()
  email: boolean = true;

  @IsBooleanString()
  @IsOptional()
  username: boolean = true;

  @IsBooleanString()
  @IsOptional()
  name: boolean = true;

  @IsBooleanString()
  @IsOptional()
  bio: boolean = true;

  @IsBooleanString()
  @IsOptional()
  createdAt: boolean = true;

  @IsBooleanString()
  @IsOptional()
  updatedAt: boolean = true;
}
