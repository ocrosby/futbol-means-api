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

import { ITeamDocument } from "../models/team.model"
import { TeamsService, TeamCreationParams } from "../services/teams.service"

@Route('teams')
@Tags('Team')
export class TeamsController extends Controller {
  @Get('/')
  public async getTeams(): Promise<ITeamDocument[]> {
    return new TeamsService().getAll()
  }

  @Get('{teamId}')
  public async getTeam (
    @Path() teamId: number
  ): Promise<ITeamDocument> {
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
