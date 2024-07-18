import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './users.controller';
import { AppPipeTransform } from './users.pipe';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_PIPE,
      useClass: AppPipeTransform,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
