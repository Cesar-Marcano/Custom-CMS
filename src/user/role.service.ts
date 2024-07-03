import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private user: UserService) {}

  private async assignRoleToUser(
    userId: number,
    role: Role,
  ): Promise<User | null> {
    return this.user.updateUser({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });
  }

  public async banUser(userId: number): Promise<User | null> {
    return this.assignRoleToUser(userId, Role.READONLY);
  }

  public async promoteUser(userId: number): Promise<User | null> {
    return this.assignRoleToUser(userId, Role.ADMIN);
  }

  public async demoteUser(userId: number): Promise<User | null> {
    return this.assignRoleToUser(userId, Role.USER);
  }
}
