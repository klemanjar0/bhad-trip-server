import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import ErrorService from '../../errors/ErrorService';
import { Response, Request } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthService } from './auth.service';
import { RegisterPayload } from './entities';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Res() res: Response, @Body() body: RegisterPayload) {
    try {
      const response = await this.authService.login(body);
      return res.status(HttpStatus.OK).send(response);
    } catch (e) {
      const err = ErrorService.getError(e.message);
      return res.status(err.statusCode).send(err);
    }
  }

  @Post('signup')
  async signUp(@Res() res: Response, @Body() body: RegisterPayload) {
    try {
      const response = await this.authService.register(body);
      return res.status(HttpStatus.OK).send(response);
    } catch (e) {
      const err = ErrorService.getError(e.message);
      return res.status(err.statusCode).send(err);
    }
  }

  @Post('getUserData')
  async getUserData(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await this.authService.checkAuth(req);
      return res.status(HttpStatus.OK).send(response);
    } catch (e) {
      const err = ErrorService.getError(e.message);
      return res.status(err.statusCode).send(err);
    }
  }
}
