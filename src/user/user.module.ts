import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService],
})
export class UserModule {}
