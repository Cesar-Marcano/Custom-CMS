import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/logInUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
