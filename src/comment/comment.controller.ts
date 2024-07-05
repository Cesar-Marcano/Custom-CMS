import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment, Role } from '@prisma/client';
import { GetCommentsDto } from './dto/getComments.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { jwtPayload } from 'src/auth/auth.service';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { UserGuard } from 'src/guards/user.guard';
import { AuthGuard } from 'src/guards/auth.guard';

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
  public async getPostComments(
    @Param('slug') slug: string,
    @Query() query: GetCommentsDto,
  ): Promise<Comment[]> {
    return await this.comment.comments({
      skip: query.page * query.limit,
      take: query.limit,
      post: { slug },
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(UserGuard)
  @Post('')
  public async createComment(
    @Body() data: CreateCommentDto,
    @Request() req,
  ): Promise<Comment> {
    const user: jwtPayload = req.user;

    return await this.comment.createComment({
      content: data.content,
      post: {
        connect: {
          slug: data.postSlug,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(UserGuard)
  @Put(':id')
  public async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCommentDto,
    @Request() req,
  ): Promise<Comment> {
    const user: jwtPayload = await req.user;

    const theCommentExists = !!this.comment.comment({
      id,
      user: { id: user.id },
    });

    if (!theCommentExists) throw new NotFoundException('Comment not found.');

    return await this.comment.updateComment({
      data,
      where: {
        id,
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Comment> {
    const user: jwtPayload = await req.user;

    if (user.role !== Role.ADMIN) {
      const theCommentExists = !!this.comment.comment({
        id,
        user: { id: user.id },
      });

      if (!theCommentExists) throw new NotFoundException('Comment not found.');
    }

    return await this.comment.deleteComment({
      id,
    });
  }
}
