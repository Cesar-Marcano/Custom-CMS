import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get(':id')
  public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.user.user({
      id,
    });
  }

  @Post('/')
  public async createUser(@Body() data: CreateUserDto): Promise<User> {
    return await this.user.createUser(data);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User | null> {
    return await this.user.updateUser({
      where: {
        id,
      },
      data,
    });
  }

  @Delete(':id')
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    return await this.user.deleteUser({
      id,
    });
  }
}
