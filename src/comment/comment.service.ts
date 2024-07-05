import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentService {
  constructor(private prisma: DatabaseService) {}

  public async comment(
    where: Prisma.CommentWhereUniqueInput,
  ): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({ where });

    if (!comment) throw new NotFoundException('Comment not found.');

    return comment;
  }

  public async comments(params: {
    post: Prisma.PostWhereUniqueInput;
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy, post } = params;
    return await this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where: {
        post,
        ...where,
      },
      orderBy,
    });
  }

  public async createComment(
    data: Prisma.CommentCreateInput,
  ): Promise<Comment | null> {
    try {
      return this.prisma.comment.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while creating comment');
    }
  }
}
