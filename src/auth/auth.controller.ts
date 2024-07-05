import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService, jwtPayload } from './auth.service';
import { LoginDto } from './dto/logInUser.dto';
import { AdminGuard } from '../guards/admin.guard';
import { RoleService } from 'src/user/role.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(
    @Body() data: CreateUserDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.register(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(
    @Body() data: LoginDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.login(data);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Patch('promote-user/:id')
  public async promoteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.roleService.promoteUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Patch('demote-user/:id')
  public async demoteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.roleService.demoteUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Patch('ban-user/:id')
  public async banUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.roleService.banUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('profile')
  public async myProfile(@Request() req): Promise<Partial<User>> {
    const user: jwtPayload = req.user;

    return await this.authService.profile(user.id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('profile/:id')
  public async profile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<User>> {
    return await this.authService.profile(id);
  }
}
