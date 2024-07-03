import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private user: UserService) {}

  private assignRoleToUser(userId: number, role: Role): Promise<User | null> {
    return this.user.updateUser({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });
  }

  public banUser(userId: number): Promise<User | null> {
    return this.assignRoleToUser(userId, Role.READONLY);
  }

  public promoteUser(userId: number): Promise<User | null> {
    return this.assignRoleToUser(userId, Role.ADMIN);
  }

  public demoteUser(userId: number): Promise<User | null> {
    return this.assignRoleToUser(userId, Role.USER);
  }
}
