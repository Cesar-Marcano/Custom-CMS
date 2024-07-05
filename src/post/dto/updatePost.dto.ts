import { Post } from '@prisma/client';
import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class UpdatePostDto implements Partial<Post> {
  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }
  @IsString()
  @IsNotEmpty()
  @Length(10, 80)
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @Length(300, 10_000)
  @IsOptional()
  content?: string;
}
