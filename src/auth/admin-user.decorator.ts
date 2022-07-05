import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const AdminUser = createParamDecorator(
  (_data, ctx: ExecutionContext): boolean => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user.isAdmin) {
      throw new HttpException(
        'Admin rights required!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  },
);
