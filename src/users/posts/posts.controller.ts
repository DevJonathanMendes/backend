import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, CreatePostInput } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostsGuard } from './posts.guard';
import { PostsService } from './posts.service';

@UseGuards(PostsGuard)
@Controller('users/:authorId/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Req() req: Request & { user: { id: number } },
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    const data: CreatePostInput = { ...createPostDto, authorId: req.user.id };

    return this.postsService.create({ data });
  }

  @Get()
  findMany(@Param('authorId', ParseIntPipe) authorId: number) {
    return this.postsService.findAll({ where: { authorId } });
  }
}
