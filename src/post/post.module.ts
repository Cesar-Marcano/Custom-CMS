import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    DatabaseModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
