import { inject, injectable } from "inversify";

// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "./users.model";
import { UsersService, UserCreationParams } from "./users.service";

@Route("api/users")
@injectable()
export class UsersController extends Controller {
  protected usersService: UsersService;

  constructor(
    @inject(UsersService) usersService: UsersService
  ) {
    super();

    this.usersService = usersService;
  }

  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return await this.usersService.get(userId, name);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    await this.usersService.create(requestBody);
    return;
  }
}
