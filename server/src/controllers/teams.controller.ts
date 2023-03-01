import { inject, injectable } from 'inversify'

import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse
} from 'tsoa'

import { type TeamDoc } from '../interfaces/team.interface'
import { TeamsService, TeamCreationParams } from "../services/teams.service"

@Route('api/teams')
@injectable()
export class TeamsController extends Controller {
  protected teamsService: TeamsService

  constructor (
    @inject(TeamsService) teamsService: TeamsService
  ) {
    super()

    this.teamsService = teamsService
  }

  @Get('/')
  public async getTeams(): Promise<TeamDoc[]> {
    return this.teamsService.getAll()
  }

  @Get('{teamId}')
  public async getTeam (
    @Path() teamId: number
  ): Promise<TeamDoc> {
    return this.teamsService.getById(teamId)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createTeam (
    @Body() requestBody: TeamCreationParams
  ) {
    await this.teamsService.create(requestBody)
  }
}
