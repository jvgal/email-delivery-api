export type JwtPayload = {
  data: {
    ref: string;
    userName: string;
    networkLogin: string;
    clientId: string;
    email: string;
    userTags: string[];
  };
};
