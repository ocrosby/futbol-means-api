import {
  Body,
  Controller,
  Get,
  Path,
  Put,
  Post,
  Patch,
  Delete,
  Route,
  Tags,
  SuccessResponse
} from 'tsoa'

import { ITeam, ITeamDocument } from '../models/team.model'
import TeamsService from '../services/teams.service'
import { IPatchOperation } from '../interfaces/patch.interface';

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

  @Put('{id}')
  public async updateTeam (
    @Path() id: string,
    @Body() requestBody: ITeam
  ): Promise<ITeamDocument | null> {
    return await TeamsService.updateOne(id, requestBody)
  }

  @Delete('{id}')
  public async deleteTeam (
    @Path() id: string
  ): Promise<void> {
    await TeamsService.delete(id)

    return Promise.resolve()
  }

  @Patch('{id}')
  public async patchTeam(
    @Path() id: string,
    @Body() requestBody: IPatchOperation[]
  ): Promise<void> {
    await TeamsService.patch(id, requestBody)

    return Promise.resolve()
  }
}
