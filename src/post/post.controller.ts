import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { Post as PostModel } from '@prisma/client';
import { PostService } from './post.service';
import { jwtPayload } from 'src/auth/auth.service';
import { GetPostsDto } from './dto/getPosts.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  @Post('create')
  public async createPost(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ): Promise<PostModel> {
    const user: jwtPayload = req.user;
    return await this.postService.createPost({
      ...createPostDto,
      user: {
        connect: {
          id: user.id,
        },
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getPosts(
    @Query() query: GetPostsDto,
  ): Promise<PostModel[] | null> {
    return await this.postService.posts({
      skip: query.page * query.limit,
      take: query.limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get(':slug')
  public async getPost(@Param('slug') slug: string): Promise<PostModel> {
    return await this.postService.post({
      slug,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Patch(':slug')
  public async updatePost(
    @Param('slug') slug: string,
    @Body() data: UpdatePostDto,
  ): Promise<PostModel> {
    return await this.postService.updatePost({
      where: {
        slug,
      },
      data,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Delete(':slug')
  public async deletePost(@Param('slug') slug: string): Promise<PostModel> {
    return await this.postService.deletePost({
      slug,
    });
  }
}
