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
import { Team } from "./teams.model";
import { TeamsService, TeamCreationParams } from "./teams.service";

@Route("teams")
export class TeamsController extends Controller {
  @Get("{teamId}")
  public async getTeam(
    @Path() teamId: number,
    @Query() name?: string
  ): Promise<Team> {
    return await new TeamsService().get(teamId, name);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createTeam(
    @Body() requestBody: TeamCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    await new TeamsService().create(requestBody);
    return;
  }
}
