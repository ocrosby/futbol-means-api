import { Team, TeamModel } from "../models/team.model"
import { provideSingleton } from "../utils/provideSingleton";


// A post request should not contain unneeded parameters
export type TeamCreationParams = Pick<Team, "name" | "season" | "owner">

@provideSingleton(TeamsService)
export class TeamsService {
  public async getAll(): Promise<Team[]> {
    return TeamModel.find({});
  }

  public async getById(id: number): Promise<Team> {
    return await TeamModel.findById(id) as Team
  }

  public async create(teamCreationParams: TeamCreationParams): Promise<Team> {
    const newTeam = new TeamModel(teamCreationParams)

    await newTeam.save()

    return newTeam
  }

  public async delete(id: number): Promise<void> {
    await TeamModel.deleteOne({_id: id})

    return Promise.resolve();
  }
}
