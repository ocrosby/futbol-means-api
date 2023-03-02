import { inject } from 'inversify'

// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse
} from 'tsoa'

import { User } from '../models/user.model'
import { UsersService, UserCreationParams } from '../services/users.service'
import {provideSingleton} from "../utils/provideSingleton";

@Route('api/users')
@provideSingleton(UsersController)
export class UsersController extends Controller {
  protected usersService: UsersService

  constructor (
  @inject(UsersService) usersService: UsersService
  ) {
    super()

    this.usersService = usersService
  }

  @Get('{userId}')
  public async getUser (
    @Path() userId: number,
      @Query() name?: string
  ): Promise<User> {
    return this.usersService.get(userId)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser (
    @Body() requestBody: UserCreationParams
  ): Promise<User> {
    this.setStatus(201) // set return status 201
    return this.usersService.create(requestBody, requestBody.password)
  }
}
