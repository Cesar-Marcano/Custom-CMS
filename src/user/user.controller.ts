import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('/:id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.user.user({
      id: id,
    });
  }

  @Post('/')
  public createUser(@Body() data: CreateUserDto): Promise<User | null> {
    return this.user.createUser(data);
  }
}
