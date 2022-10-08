import * as randomString from 'randomstring';
import * as jsonwebtoken from 'jsonwebtoken';
import { VerifyErrors } from 'jsonwebtoken';
import { ENVService, ENVVar } from '../../env';

const env = ENVService.getVariables();
type JWTPayload = { sub: number; username: string };

class JwtService {
  private readonly secret: string;
  private readonly options: { expiresIn: string };

  constructor() {
    this.secret = env[ENVVar.JWT_SECRET] || randomString.generate(100);
    this.options = { expiresIn: env[ENVVar.JWT_MAX_AGE] || '3h' };
  }

  public getJwt(data: JWTPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(data, this.secret, this.options, (err, token) => {
        err ? reject(err) : resolve(token || '');
      });
    });
  }

  public decodeJwt(jwt: string): Promise<JWTPayload> {
    return new Promise((res, rej) => {
      jsonwebtoken.verify(
        jwt,
        this.secret,
        (err: VerifyErrors | null, decoded?: object) => {
          return err ? rej(err) : res(decoded as JWTPayload);
        },
      );
    });
  }
}

export default new JwtService();
