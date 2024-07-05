import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '@prisma/client';

@Controller('comment')
export class CommentController {
  constructor(private readonly comment: CommentService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getComment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Comment> {
    return await this.comment.comment({ id });
  }

  @HttpCode(HttpStatus.OK)
  @Get('post/:slug')
  public async getPostComment(@Param('slug') slug: string): Promise<Comment[]> {
    return await this.comment.comments({ post: { slug } });
  }
}
