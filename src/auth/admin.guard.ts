import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { jwtPayload } from 'src/auth/auth.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminGuard extends AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = await super.canActivate(context);
    if (!isAuth) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user: jwtPayload = request.user;

    if (user.role === Role.ADMIN) {
      return true;
    } else {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }
  }
}
