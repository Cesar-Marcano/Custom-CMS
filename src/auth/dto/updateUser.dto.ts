import { ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto implements Partial<User> {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiPropertyOptional()
  @IsString()
  @Length(2, 50)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(2, 50)
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(8, 40)
  @IsOptional()
  password?: string;
}
