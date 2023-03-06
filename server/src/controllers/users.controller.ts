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
import UserService from '../services/users.service'
import {IPatchOperation} from "../interfaces/patch.interface";

@Route('users')
@Tags('User')
export class UsersController extends Controller {
  @Get('/')
  public async getAllUsers(): Promise<IUserDocument[]> {
    return await UserService.getAll();
  }

  @Get('{userId}')
  public async getUser (
    @Path() userId: string,
    @Query() name?: string
  ): Promise<nullable<IUserDocument>> {
    return await UserService.get(userId)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser (
    @Body() requestBody: IUserCreationParams
  ): Promise<IUserDocument> {
    this.setStatus(201) // set return status 201
    return await UserService.addOne(requestBody as IUser, requestBody.password)
  }

  @Put('{userId}')
  public async updateUser (
    @Path() userId: string,
    @Body() requestBody: IUser
  ): Promise<nullable<IUserDocument>> {
    return await UserService.updateOne(userId, requestBody)
  }

  @Delete('{userId}')
  public async deleteUser (
    @Path() userId: string
  ): Promise<void> {
    return await UserService.delete(userId)
  }

  @Patch('{userId}')
  public async patchUser (
    @Path() userId: string,
    @Body() requestBody: IPatchOperation[]
  ): Promise<void> {
    return await UserService.patch(userId, requestBody)
  }
}
