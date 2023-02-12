/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Route,
  Response,
  Get,
  Post,
  Patch,
  Header,
  Body,
  Security,
  Controller,
  Path,
} from 'tsoa';

import { IUserCreateRequest, IUserUpdateRequest } from '../request/index';
import { IUserResponse, IErrorResponse } from '../responses/index';
import { validateUserRegistration } from '../../business-layer/validators/user/UserValidationProcessor';
import { createAuthToken } from '../../business-layer/security/token-helpers';

import { UserDataAgent } from '../../data-layer/data-agents/UserDataAgent';
import { UserModel } from '../../data-layer/models/UserModel';

import { logger } from '../../middleware/common/logging';

@Route('Users')
export class UsersController extends Controller {
  userDataAgent: UserDataAgent = new UserDataAgent();

  @Post()
  public async RegisterNewUser(
    @Body() request: IUserCreateRequest
  ): Promise<IUserResponse> {
    const validationErrors: any[] = await validateUserRegistration(request);
    logger.info('RegisterNewUser  validationErrors =', validationErrors);
    if (validationErrors.length > 0) {
      throw {
        thrown: true,
        status: 401,
        message: 'incorrect input',
        data: validationErrors,
      };
    }
    const result = await this.userDataAgent.createNewUser(request);
    if (result.id) {
      const newUser = new UserModel(result);
      const loginResult = Object.assign({
        account: {
          user: newUser.getClientUserModel(),
          token: createAuthToken(result.id),
        },
      });
      return <IUserResponse>loginResult;
    } else {
      throw result;
    }
  }

  @Security('api_key')
  @Get('{userId}')
  public async GetUserById(
    userId: string,
    @Header('x-access-token') authentication: string
  ): Promise<IUserResponse> {
    const result = await this.userDataAgent.getUserById(userId);
    if (result && result.username) {
      const aUser = new UserModel(result);
      return <IUserResponse>aUser.getClientUserModel();
    } else {
      if (result) {
        throw result;
      } else {
        throw {
          thrown: true,
          status: 404,
          message: 'no such user exist',
        };
      }
    }
  }

  @Response<IErrorResponse>('404', 'no such user exist')
  @Get('username/{username}')
  public async GetUserByUsername(
    @Path() username: string
  ): Promise<IUserResponse> {
    const result = await this.userDataAgent.getByUsername(username);
    if (result && result.username) {
      const aUser = new UserModel(result);
      return <IUserResponse>{ user: aUser.getClientUserModel() };
    } else {
      throw result;
    }
  }

  @Patch()
  public async Update(
    @Body() request: IUserUpdateRequest
  ): Promise<IUserResponse> {
    const result = await this.userDataAgent.updateUserProfile(request);
    if (result.id) {
      const aUser = new UserModel(result);
      return <IUserResponse>aUser.getClientUserModel();
    } else {
      throw result;
    }
  }
}
