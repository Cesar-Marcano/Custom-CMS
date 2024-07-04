import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService],
})
export class UserModule {}
