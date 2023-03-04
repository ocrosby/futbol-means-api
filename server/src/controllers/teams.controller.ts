import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  Tags,
  SuccessResponse
} from 'tsoa'

import { Team } from "../models/team.model"
import { TeamsService, TeamCreationParams } from "../services/teams.service"

@Route('api/teams')
@Tags("Team")
export class TeamsController extends Controller {
  @Get('/')
  public async getTeams(): Promise<Team[]> {
    return new TeamsService().getAll()
  }

  @Get('{teamId}')
  public async getTeam (
    @Path() teamId: string
  ): Promise<Team> {
    return new TeamsService().getById(teamId)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createTeam (
    @Body() requestBody: TeamCreationParams
  ) {
    await new TeamsService().create(requestBody)
  }
}
