import { UserEntity } from '../../users/entities/user.entity';

export class TokenEntity extends UserEntity {
  constructor(partial: TokenEntity) {
    super(partial);
    Object.assign(this, partial);
  }

  token: string;
}
