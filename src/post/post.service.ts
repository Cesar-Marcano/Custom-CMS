import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostService {
  constructor(private prisma: DatabaseService) {}

  public async post(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({ where });

    if (!post) throw new NotFoundException('Post not found.');

    return post;
  }

  public async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    const post = await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    if (post.length < 1) throw new NotFoundException('Falied to fetch posts.');

    return post;
  }

  public async createPost(data: Prisma.PostCreateInput): Promise<Post | null> {
    try {
      return await this.prisma.post.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while creating post.');
    }
  }

  public async updatePost(params: {
    data: Prisma.PostUpdateInput;
    where: Prisma.PostWhereUniqueInput;
  }): Promise<Post | null> {
    try {
      return await this.prisma.post.update({
        data: params.data,
        where: params.where,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while updating post.');
    }
  }

  public async deletePost(
    where: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    try {
      return await this.prisma.post.delete({
        where,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while deleting post.');
    }
  }
}
