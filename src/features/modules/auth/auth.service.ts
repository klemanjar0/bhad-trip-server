import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserField } from '../../models/User';
import { RegisterPayload } from './entities';
import { ERROR } from '../../errors/ErrorCodes';
import { ENTITY } from '../../constants';
import { validatePayload } from './auth.utils';
import { compareHash } from '../../bcrypt';
import { Request } from 'express';
import JwtService from '../../shared/JWTService';

@Injectable()
export class AuthService {
  entity = ENTITY.USER;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async authenticate(user: {
    [UserField.Id]: number;
    [UserField.UserName]: string;
  }) {
    const payload = {
      username: user[UserField.UserName],
      sub: user[UserField.Id],
    };
    return {
      accessToken: await JwtService.getJwt(payload),
    };
  }

  async checkAuth(@Req() req: Request) {
    const token: string =
      (req.headers['authorization'] as string) ||
      (req.headers['Authorization'] as string);

    try {
      const data = await JwtService.decodeJwt(token);

      if (!data.sub) {
        throw new Error();
      }

      return data;
    } catch (e) {
      throw new Error(ERROR.UNAUTHORIZED);
    }
  }

  async checkPermission(@Req() req: Request, grantedUserId: number) {
    const token: string =
      (req.headers['authorization'] as string) ||
      (req.headers['Authorization'] as string);

    if ((await JwtService.decodeJwt(token)).sub !== grantedUserId) {
      throw new Error(ERROR.UNAUTHORIZED);
    }
  }

  async login(payload: RegisterPayload) {
    const { username = '', password = '' } = payload;

    const user = await this.userRepository.findOneBy({
      [UserField.UserName]: username,
    });

    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }

    if (!(await compareHash(password, user[UserField.Password]))) {
      throw new Error(ERROR.INCORRECT_PASSWORD);
    }

    return await this.authenticate(user);
  }

  async register(payload: RegisterPayload) {
    validatePayload(payload);

    if (
      !!(await this.userRepository.findOneBy({
        [UserField.UserName]: payload.username,
      }))
    ) {
      throw new Error(ERROR.USERNAME_DUPLICATE);
    }

    const user = await this.userRepository.create({
      [UserField.UserName]: payload.username,
      [UserField.Password]: payload.password,
    });

    await user.save();

    return await this.authenticate(user);
  }
}
