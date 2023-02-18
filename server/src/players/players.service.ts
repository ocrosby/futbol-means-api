import { PlayerModel, Player, PlayerDoc } from "./players.model";
import PlayerNotFoundException from "../exceptions/PlayerNotFoundException";

// A post request should not contain an id.
export type PlayerCreationParams = Pick<Player, "name"|"team"|"jerseyNumber"|"grade"|"height"|"weight"|"positions">

export class PlayersService {
  public async create(params: PlayerCreationParams): Promise<Player> {
    return new Promise<Player>(async (resolve, reject) => {
      let newPlayer: PlayerDoc;

      try {
        newPlayer = await PlayerModel.create(params);

        resolve(newPlayer);
      } catch (err: any) {
        reject(err.message);
      }
    });
  }

  public async getAll(): Promise<Player[]> {
    return new Promise<Player[]>(async (resolve, reject) => {
      try {
        const players = await PlayerModel.find();

        resolve(players);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async get(id: number): Promise<Player> {
    return new Promise<Player>(async (resolve, reject) => {
      let player: Player | null;

      try {
        player = await PlayerModel.findById(id);

        if (player === null) {
          reject(new PlayerNotFoundException(id.toString()));
        }

        // @ts-ignore
        resolve(player);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async deleteById(id: number): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await PlayerModel.findByIdAndDelete(id);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public async update(player: PlayerDoc): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const id = player.id;
        const filter = { _id: id };
        const options = { upsert: true };
        const modificationResult = await PlayerModel.replaceOne(filter, player).setOptions(options);

        if (modificationResult.modifiedCount) {
          resolve();
        } else {
          reject(new Error(`Player modification failed for id {id}!`))
        }
      } catch (error) {
        reject(error);
      }
    });
  }

}
