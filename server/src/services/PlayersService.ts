import { IPlayer } from "../models/Player";
import { PlayerBuilder } from "../models/PlayerBuilder";

export class PlayersService {
    private builder: PlayerBuilder;

    constructor() {
        this.builder = new PlayerBuilder();
    }

    getAll(): Promise<IPlayer[]> {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    get(userId: number): Promise<IPlayer> {
        return new Promise((resolve, reject) => {
            this.builder.build();
            this.builder.buildName("John");
            this.builder.buildJerseyNumber(20);
            this.builder.buildPosition("Forward");

            resolve(this.builder.getInstance());
        });
    }

    create(requestBody: PlayerCreationParams): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}