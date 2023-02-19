import { inject, injectable } from "inversify";

import {
  Body,
  Controller,
  Get,
  Delete,
  Put,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";


import {Player, PlayerDoc} from "./players.model";
import {PlayerCreationParams, PlayersService} from "./players.service";

@Route('api/players')
@injectable()
export class PlayersController extends Controller {
  protected playersService: PlayersService;

  constructor(
    @inject(PlayersService) playersService: PlayersService
  ) {
    super();

    this.playersService = playersService;
  }

  @Get("{playerId}")
  public async getPlayer(
    @Path() playerId: number,
    @Query() name?: string
  ): Promise<Player> {
    return await this.playersService.get(playerId);
  }

  @Get("/")
  public async getAllPlayers(): Promise<Player[]> {
    return await this.playersService.getAll();
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createPlayer(
    @Body() requestBody: PlayerCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    await this.playersService.create(requestBody)
    return;
  }

  @Put()
  public async modifyPlayer(
    @Body() requestBody: PlayerDoc
  ): Promise<void> {
    this.setStatus(200);
    await this.playersService.update(requestBody)
    return;
  }

  @Delete("{playerId}")
  public async deletePlayer(
    @Path() playerId: number
  ): Promise<void> {
    this.setStatus(200);
    await new PlayersService().deleteById(playerId);
    return;
  }
}
