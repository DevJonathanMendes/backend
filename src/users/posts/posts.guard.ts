import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PostsGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const { method, params, user } = ctx.switchToHttp().getRequest();

    if (method === 'GET') return true;

    if (user.id !== parseInt(params.authorId)) {
      throw new ForbiddenException([
        'You do not have permission for this feature.',
      ]);
    }

    return true;
  }
}
