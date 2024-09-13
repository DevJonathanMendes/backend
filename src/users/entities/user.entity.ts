import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements Partial<User> {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: number;
  email: string;
  username: string;

  @Exclude()
  password: string;

  name: string;
  bio: string | null;

  createdAt: Date;
  updatedAt: Date;
}
