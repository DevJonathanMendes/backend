import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  username: string;
  password: string;

  title: string;
  about: string;
}
