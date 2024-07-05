import { Post } from '@prisma/client';
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdatePostDto implements Partial<Post> {
  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }
  @IsString()
  @Length(10, 80)
  @IsOptional()
  title?: string;

  @IsString()
  @Length(300, 10_000)
  @IsOptional()
  content?: string;
}
