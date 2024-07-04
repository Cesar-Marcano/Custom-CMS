import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      throw new BadRequestException('Error retrieving user.');
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw new BadRequestException('Error retrieving users.');
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    data.password = hash;

    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'A user with this email already exists.',
          );
        }
      }

      throw new BadRequestException('Error creating user.');
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      throw new BadRequestException('Error updating user.');
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where,
      });
    } catch (error) {
      throw new BadRequestException('Error deleting user.');
    }
  }
}
