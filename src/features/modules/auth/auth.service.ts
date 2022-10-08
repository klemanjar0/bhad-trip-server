import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserField } from '../../models/User';
import { RegisterPayload } from './entities';
import { ERROR } from '../../errors/ErrorCodes';
import { ENTITY } from '../../constants';
import { JwtService } from '@nestjs/jwt';
import { validatePayload } from './auth.utils';
import { compareHash } from '../../bcrypt';

@Injectable()
export class AuthService {
  entity = ENTITY.USER;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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
      accessToken: this.jwtService.sign(payload),
    };
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
