import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { Post as PostModel } from '@prisma/client';
import { PostService } from './post.service';
import { jwtPayload } from 'src/auth/auth.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AdminGuard)
  @Post('create')
  public async createPost(
    @Body() createPostDto: CreatePostDto,
    @Res() res,
  ): Promise<PostModel> {
    const user: jwtPayload = res.user;
    return this.postService.createPost({
      ...createPostDto,
      user: {
        connect: {
          id: user.id,
        },
      },
    });
  }
}
