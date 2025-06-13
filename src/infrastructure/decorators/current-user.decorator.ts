import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReqUser } from '../auth/types/req-user.type';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

export const CurrentUser = createParamDecorator(
  (
    data: keyof ReqUser | undefined,
    context: ExecutionContext,
  ): ReqUser | ReqUser[keyof ReqUser] => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    return !data ? request.user : request.user?.[data];
  },
);
