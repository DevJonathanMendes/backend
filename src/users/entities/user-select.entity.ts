import { Prisma } from '@prisma/client';

export class UserSelectEntity implements Required<Prisma.UserSelectScalar> {
  id: boolean = true;
  email: boolean = true;
  username: boolean = true;
  password: boolean = false;
  name: boolean = true;
  bio: boolean = true;
  createdAt: boolean = true;
  updatedAt: boolean = true;
}
