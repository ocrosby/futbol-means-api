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

@Route('players')
export class PlayersController extends Controller {
  @Get("{playerId}")
  public async getPlayer(
    @Path() playerId: number,
    @Query() name?: string
  ): Promise<Player> {
    return await new PlayersService().get(playerId);
  }

  @Get("/")
  public async getAllPlayers(): Promise<Player[]> {
    return await new PlayersService().getAll();
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createPlayer(
    @Body() requestBody: PlayerCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    await new PlayersService().create(requestBody)
    return;
  }

  @Put()
  public async modifyPlayer(
    @Body() requestBody: PlayerDoc
  ): Promise<void> {
    this.setStatus(200);
    await new PlayersService().update(requestBody)
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
