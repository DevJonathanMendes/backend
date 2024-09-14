import { UserEntity } from '../../users/entities/user.entity';

export class UserTokenEntity extends UserEntity {
  constructor(partial: UserTokenEntity) {
    super(partial);
    Object.assign(this, partial);
  }

  token: string;
}
