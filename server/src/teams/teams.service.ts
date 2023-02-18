import TeamModel, { Team, TeamDoc } from "./teams.model";
import TeamNotFoundException from "../exceptions/TeamNotFoundException";

// A post request should not contain an id.
export type TeamCreationParams = Pick<Team, "name" | "season">;

export class TeamsService {
  public async create(params: TeamCreationParams): Promise<Team> {
    return new Promise<Team>(async (resolve, reject) => {
      let newTeam: TeamDoc;

      try {
        newTeam = await TeamModel.create(params);

        resolve(newTeam);
      } catch (err: any) {
        reject(err.message);
      }
    });
  }

  public async get(id: number, name?: string): Promise<Team> {
    const identifier = id.toString();

    return new Promise<Team>(async (resolve, reject) => {
      let team: TeamDoc | null;

      team = await TeamModel.findById(id, name);

      if (!team) {
        reject(new TeamNotFoundException(identifier));
      }

      resolve(team as Team);
    });
  }

  // public getAll(): Promise<Team[]> {
  //   return this.team.find();
  // }
  //
  //
  // public update(id: number, params: TeamCreationParams): Team {
  //
  // }
  //
  // public delete(id: number): void {
  //
  // }
}
