import { User } from '@prisma/client';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto implements Partial<User> {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @IsString()
  @Length(2, 50)
  name?: string;

  @IsString()
  @Length(2, 50)
  lastName?: string;

  @IsString()
  @Length(8, 40)
  password?: string;
}
