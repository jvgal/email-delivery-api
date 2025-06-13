import { Request } from 'express';
import { ReqUser } from '../auth/types/req-user.type';

export interface AuthenticatedRequest extends Request {
  user: ReqUser;
}
