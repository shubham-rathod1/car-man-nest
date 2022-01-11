import { ExecutionContext, createParamDecorator } from '@nestjs/common';
// constext is like a wrapper around the incoming request.

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentUser;
    // console.log(request.session.userId);
    // return 'hello dolly';
  },
);
