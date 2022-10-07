import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserField } from '../../models/User';
import { RegisterPayload } from './entities';
import { ERROR } from '../../errors/ErrorCodes';
import { ENTITY } from '../../constants';

@Injectable()
export class AuthService {
  entity = ENTITY.USER;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async authenticate() {}

  async register(payload: RegisterPayload) {
    if (!payload.password || !payload.username) {
      throw new Error(ERROR.INCOMPLETE_REQUEST_DATA);
    }

    if (
      !!(await this.userRepository.findOneBy({
        [UserField.UserName]: payload.username,
      }))
    ) {
      throw new Error(ERROR.USERNAME_DUPLICATE);
    }
  }
}
