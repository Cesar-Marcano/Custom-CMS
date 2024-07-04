import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto implements Partial<User> {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 40)
  password: string;
}
