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
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService, jwtPayload } from './auth.service';
import { LoginDto } from './dto/logInUser.dto';
import { AdminGuard } from './admin.guard';
import { RoleService } from 'src/user/role.service';
import { AuthGuard } from './auth.guard';
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

  @UseGuards(AdminGuard)
  @Patch('promote-user/:id')
  public async promoteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.roleService.promoteUser(id);
  }

  @UseGuards(AdminGuard)
  @Patch('demote-user/:id')
  public async demoteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.roleService.demoteUser(id);
  }

  @UseGuards(AdminGuard)
  @Patch('ban-user/:id')
  public async banUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.roleService.banUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  public async myProfile(@Response() res): Promise<Partial<User>> {
    const user: jwtPayload = res.user;

    return await this.authService.profile(user.id);
  }

  @UseGuards(AuthGuard)
  @Get('profile/:id')
  public async profile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<User>> {
    return await this.authService.profile(id);
  }
}
