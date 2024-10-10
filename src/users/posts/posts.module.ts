import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from '../../prisma/prisma.module';
import { PostsController } from './posts.controller';
import { PostsGuard } from './posts.guard';
import { PostsService } from './posts.service';

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    /* {
      provide: APP_GUARD,
      useClass: PostsGuard,
    }, */
  ],
})
export class PostsModule {}
