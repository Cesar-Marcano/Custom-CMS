import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/logInUser.dto';
import { AdminGuard } from './admin.guard';
import { RoleService } from 'src/user/role.service';

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
  public async promoteUser(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.promoteUser(id);
  }

  @UseGuards(AdminGuard)
  @Patch('demote-user/:id')
  public async demoteUser(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.demoteUser(id);
  }

  @UseGuards(AdminGuard)
  @Patch('ban-user/:id')
  public async banUser(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.banUser(id);
  }
}
