import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(ctx);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info?.message === 'No auth token' || info?.message === 'jwt malformed') {
        throw new UnauthorizedException('Authentication token is missing or malformed');
      }

      if (!user) {
        throw new UnauthorizedException('User not found or token invalid');
      }

      throw new UnauthorizedException('Unable to validate authentication token');
    }

    return user;
  }
}
