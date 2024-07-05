import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreatePostDto implements Partial<Post> {
  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 60)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug can only contain lowercase letters, numbers, and hyphens.',
  })
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10, 80)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(300, 10_000)
  content: string;
}
