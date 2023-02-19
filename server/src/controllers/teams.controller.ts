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
import { Team } from "../models/teams.model";
import { TeamsService, TeamCreationParams } from "../services/teams.service";
import { inject, injectable } from "inversify";

@Route("api/teams")
@injectable()
export class TeamsController extends Controller {
  protected teamsService: TeamsService;

  constructor(
    @inject(TeamsService) teamsService: TeamsService
  ) {
    super();

    this.teamsService = teamsService;
  }

  @Get()
  public async getAllTeams(): Promise<Team[]> {
    return await this.teamsService.getAll();
  }

  @Get("{teamId}")
  public async getTeam(
    @Path() teamId: number,
    @Query() name?: string
  ): Promise<Team> {
    return await this.teamsService.get(teamId, name);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createTeam(
    @Body() requestBody: TeamCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    await this.teamsService.create(requestBody);
    return;
  }
}
