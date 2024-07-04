import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { RoleService } from 'src/user/role.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

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
}
