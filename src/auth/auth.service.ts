import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { RoleService } from 'src/user/role.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/logInUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private role: RoleService,
  ) {}

  public async register(data: Prisma.UserCreateInput): Promise<User | null> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    data.password = hash;

    return await this.user.createUser(data);
  }

  public async login({ email, password }: LoginDto) {
    const user = await this.user.user({
      email,
    });

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual)
      throw new UnauthorizedException('The password provided was incorrect.');

    return user;
  }
}
