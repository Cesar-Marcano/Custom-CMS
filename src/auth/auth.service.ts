import { Injectable, UnauthorizedException } from '@nestjs/common';
import { $Enums, Prisma, User } from '@prisma/client';
import { RoleService } from 'src/user/role.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/logInUser.dto';
import { JwtService } from '@nestjs/jwt';

export interface jwtPayload {
  id: number;
  email: string;
  name: string;
  lastName: string;
  role: $Enums.Role;
}

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
    private role: RoleService,
  ) {}

  public async register(
    data: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    data.password = hash;

    const { id, email, name, lastName, role } =
      await this.user.createUser(data);

    const payload: jwtPayload = { id, email, name, lastName, role };

    const access_token = await this.jwt.signAsync(payload);

    return { access_token };
  }

  public async login({
    email,
    password,
  }: LoginDto): Promise<{ access_token: string }> {
    // The user function in UserService verifies if the user exists and throws a 404 error if not.
    const user = await this.user.user({
      email,
    });

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual)
      throw new UnauthorizedException('The password provided was incorrect.');

    const { id, name, lastName, role } = user;

    const payload: jwtPayload = { id, email, name, lastName, role };

    const access_token = await this.jwt.signAsync(payload);

    return { access_token };
  }

  public async profile(id: number): Promise<Partial<User> | null> {
    const { name, lastName, email, createdAt, role } = await this.user.user({
      id,
    });

    return { name, lastName, email, createdAt, role };
  }
}
