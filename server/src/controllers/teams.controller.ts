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

<<<<<<< HEAD
@Route('api/teams')
@Tags("Team")
=======
@Route('teams')
@Tags('Team')
>>>>>>> 57a9ac5 (fix: getting swagger working)
export class TeamsController extends Controller {
  @Get('/')
  public async getTeams(): Promise<ITeamDocument[]> {
    return new TeamsService().getAll()
  }

  @Get('{teamId}')
  public async getTeam (
<<<<<<< HEAD
    @Path() teamId: string
  ): Promise<Team> {
=======
    @Path() teamId: number
  ): Promise<ITeamDocument> {
>>>>>>> 57a9ac5 (fix: getting swagger working)
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
