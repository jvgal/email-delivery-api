import { Types } from 'mongoose';

export type ReqUser = {
  userId: Types.ObjectId;
  userName: string;
  networkLogin: string;
  email: string;
  clientId: number;
  userTags: string[];
};
