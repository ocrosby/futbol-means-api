import { Controller, Post, Route, Body, SuccessResponse } from 'tsoa';

export interface LoginResponse {
  ok: boolean;
  message: string;
}

export type LoginParams = {
  username: string;
  password: string;
};

@Route('api/login')
export class LoginController extends Controller {
  /**
   * Logs in a user.
   */
  @Post()
  @SuccessResponse('200', 'OK')
  public async login(@Body() requestBody: LoginParams): Promise<LoginResponse> {
    const { username, password } = requestBody;

    if (username === 'user' && password === 'pass') {
      return {
        ok: true,
        message: 'Login successful',
      };
    } else {
      return {
        ok: false,
        message: 'Username or password incorrect',
      };
    }
  }
}
