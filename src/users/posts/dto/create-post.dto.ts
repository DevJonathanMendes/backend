import { IsString, Length } from 'class-validator';
import { PostEntity } from '../entities/post.entity';

export class CreatePostDto
  implements Omit<PostEntity, 'id' | 'authorId' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  @Length(1, 255)
  content: string;
}

export type CreatePostInput = CreatePostDto & { authorId: number };
