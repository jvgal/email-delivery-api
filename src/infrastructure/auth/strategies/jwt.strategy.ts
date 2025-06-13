import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Types } from 'mongoose';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';
import { ReqUser } from '../types/req-user.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  validate(_: Request, payload: JwtPayload) {
    const reqUser: ReqUser = {
      userId: new Types.ObjectId(payload.data.ref),
      userName: payload.data.userName,
      networkLogin: payload.data.networkLogin,
      email: payload.data.email,
      clientId: Number(payload.data.clientId),
      userTags: payload.data.userTags,
    };

    return reqUser;
  }
}
