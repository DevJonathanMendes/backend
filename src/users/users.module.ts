import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { UsersController } from './users.controller';
import { UsersPipeTransform } from './users.pipe';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, PostsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: APP_PIPE, useClass: UsersPipeTransform },
  ],
  exports: [UsersService],
})
export class UsersModule {}
