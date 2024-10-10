import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostInput } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(params: { data: CreatePostInput }) {
    const { data } = params;

    return this.prismaService.post.create({ data });
  }

  findAll(params: { where: Prisma.PostWhereInput }) {
    const { where } = params;

    return this.prismaService.post.findMany({ where });
  }

  findOne(params: {
    where: Prisma.PostWhereUniqueInput;
    select: Prisma.PostSelect;
  }) {
    const { where } = params;

    return this.prismaService.post.findUnique({ where });
  }

  update(id: number, data: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
