import { PartialType } from '@nestjs/swagger';
import { UsersEntity } from '../entities/users.entity';

export class UpdateUserDto extends PartialType(UsersEntity) {}
