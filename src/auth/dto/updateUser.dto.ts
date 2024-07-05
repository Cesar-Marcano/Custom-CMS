import { User } from '@prisma/client';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto implements Partial<User> {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @IsString()
  @Length(2, 50)
  @IsOptional()
  name?: string;

  @IsString()
  @Length(2, 50)
  @IsOptional()
  lastName?: string;

  @IsString()
  @Length(8, 40)
  @IsOptional()
  password?: string;
}
