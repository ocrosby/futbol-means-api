import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Patch,
  Delete,
  Query,
  Route,
  Tags,
  SuccessResponse
} from 'tsoa'

import { nullable } from "../types/nullable";
import {IUser, IUserDocument, IUserCreationParams} from '../models/user.model'
import UsersService from '../services/users.service'
import {IPatchOperation} from "../interfaces/patch.interface";

@Route('users')
@Tags('User')
export class UsersController extends Controller {
  @Get('/')
  public async getAllUsers(): Promise<IUserDocument[]> {
    return await UsersService.getAll()
  }

  @Get('{userId}')
  public async getUser (
    @Path() userId: string,
    @Query() name?: string
  ): Promise<nullable<IUserDocument>> {
    return await UsersService.get(userId)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser (
    @Body() requestBody: IUserCreationParams
  ): Promise<IUserDocument> {
    this.setStatus(201) // set return status 201
    return await UsersService.addOne(requestBody as IUser, requestBody.password)
  }

  @Put('{userId}')
  public async updateUser (
    @Path() userId: string,
    @Body() requestBody: IUser
  ): Promise<nullable<IUserDocument>> {
    return await UsersService.updateOne(userId, requestBody)
  }

  @Delete('{userId}')
  public async deleteUser (
    @Path() userId: string
  ): Promise<void> {
    return await UsersService.delete(userId)
  }

  @Patch('{userId}')
  public async patchUser (
    @Path() userId: string,
    @Body() requestBody: IPatchOperation[]
  ): Promise<void> {
    await UsersService.patch(userId, requestBody)

    return Promise.resolve()
  }
}
