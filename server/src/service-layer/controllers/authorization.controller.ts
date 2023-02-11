import {
  Route,
  Get,
  Post,
  Delete,
  Response,
  Header,
  Body,
  Controller,
} from 'tsoa';
import { IUserLoginRequest } from '../request/index';
import { IUserResponse, IMessageResponse } from '../responses/index';
import { createAuthToken } from '../../business-layer/security/token-helpers';
import { UserDataAgent } from '../../data-layer/data-agents/UserDataAgent';
import { UserModel } from '../../data-layer/models/user.model';
import { logger } from '../../middleware/common/logging';

@Route('Authorizations')
export class AuthorizationsController extends Controller {
  userDataAgent = new UserDataAgent();

  @Post('Login')
  public async login(
    @Body() request: IUserLoginRequest
  ): Promise<IUserResponse> {
    const result = await this.userDataAgent.getAuthorizedUser(request);

    if (result.id) {
      const authenticatedUser = new UserModel(result);
      const loginResult = Object.assign({
        account: {
          user: authenticatedUser.getClientUserModel(),
          token: createAuthToken(result.id),
        },
      });
      const aUser = <IUserResponse>loginResult;

      return aUser;
    } else {
      throw result;
    }
  }

  @Post('Logout')
  public async logout(
    @Header('x-access-token') authentication: string
  ): Promise<IMessageResponse> {
    //  TODO: set up validation with redis and tracking of token... especially when email validation is available.
    const logoutResult = Object.assign({
      general: { message: 'user logged out', success: true },
    });
    return <IMessageResponse>logoutResult;
  }
}
