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

import { ITeam, ITeamDocument } from '../models/team.model'
import TeamsService from '../services/teams.service'

@Route('teams')
@Tags('Team')
export class TeamsController extends Controller {
  @Get('/')
  public async getTeams(): Promise<ITeamDocument[]> {
    return await TeamsService.getAll()
  }

  @Get('{teamId}')
  public async getTeam (
    @Path() teamId: string
  ): Promise<ITeamDocument | null> {
    return await TeamsService.get(teamId)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createTeam (
    @Body() requestBody: ITeam
  ): Promise<ITeamDocument> {
    this.setStatus(201) // set return status 201
    return await TeamsService.addOne(requestBody)
  }
}
