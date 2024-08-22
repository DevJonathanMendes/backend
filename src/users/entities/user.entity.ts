import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  username: string;
  password: string;

  name: string;
  surname: string;

  title: string;
  about: string;
}
