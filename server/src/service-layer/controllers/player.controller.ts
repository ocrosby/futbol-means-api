import { PlayersService } from "../services/PlayersService";
import { Controller, Example, Get, Route, Path, Post, Body, Response, SuccessResponse } from "tsoa";
import { IPlayer, PlayerCreationParams } from "../models/Player";

@Route("api/players")
export class PlayersController extends Controller {
    /**
     * Retrieves the list of all players.
     *
     * @returns Player[]
     */
    @Example<IPlayer>({
        id: "1",
        name: "Doe, John",
        jerseyNumber: 20,
        positions: ["Forward", "Midfielder"]
    })
    @Get("/")
    public async getPlayers(): Promise<IPlayer[]> {
        return [];
    }

    @Post()
    @SuccessResponse("201", "Created")  // Custom success response
    @Response<ValidationErrorJSON>(422, "Validation Failed", {
        message: "Validation Failed",
        details: {
            requestBody: {
                message: "id is an excess property and therefore not allowed",
                value: "52907745-7672-470e-a803-a2f8feb52944",
            }
        }
    })
    public async createPlayer(
        @Body() requestBody: PlayerCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201

        new PlayersService().create(requestBody);
    }

    /**
     * Retrieves the details of an existing player.
     * Supply the unique user ID and receive corresponding user data.
     *
     * @param playerId
     * @returns Player
     */
    @Get("{playerId}")
    public async getPlayer(
        @Path() playerId: number
    ): Promise<IPlayer> {
        return new PlayersService().get(playerId);
    }
}
