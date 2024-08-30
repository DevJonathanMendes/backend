import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  username: string;
  password: string;

  name: string;
  bio: string;

  createdAt: Date;
  updatedAt: Date;
}
