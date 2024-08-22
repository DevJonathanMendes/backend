import { IsBooleanString, IsOptional } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class SelectFieldsUser
  implements Record<keyof Omit<UserEntity, 'password'>, boolean>
{
  @IsBooleanString()
  @IsOptional()
  id: boolean;

  @IsBooleanString()
  @IsOptional()
  username: boolean;

  @IsBooleanString()
  @IsOptional()
  name: boolean;

  @IsBooleanString()
  @IsOptional()
  surname: boolean;

  @IsBooleanString()
  @IsOptional()
  title: boolean;

  @IsBooleanString()
  @IsOptional()
  about: boolean;
}
