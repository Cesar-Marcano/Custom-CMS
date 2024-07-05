import { Comment, Post } from '@prisma/client';
import { IsString, Length } from 'class-validator';

export class UpdateCommentDto implements Partial<Comment> {
  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }

  @IsString()
  @Length(1, 300)
  content: string;
}
