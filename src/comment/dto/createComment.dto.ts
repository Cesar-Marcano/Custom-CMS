import { Comment, Post } from '@prisma/client';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto implements Partial<Comment> {
  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }

  @IsString()
  @Length(1, 300)
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  postSlug: string;
}
