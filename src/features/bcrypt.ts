import * as bcrypt from 'bcryptjs';
import { SALT_WORK_FACTOR } from './constants';

export const hash = (data: string) => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(data, SALT_WORK_FACTOR, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

export const compareHash = (initial: string, hashed: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(initial, hashed, function (err: any, isMatch: boolean) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};
