<<<<<<< HEAD
import { Team, TeamModel } from "../models/team.model"
=======
import { ITeamDocument, Team } from "../models/team.model"

>>>>>>> 57a9ac5 (fix: getting swagger working)
import Logger from '../utils/logger'

// A post request should not contain unneeded parameters
export type TeamCreationParams = Pick<ITeamDocument, "name" | "season" | "owner">



export class TeamsService {
  public async getAll(): Promise<ITeamDocument[]> {
    Logger.debug('Retrieving teams ...')

<<<<<<< HEAD
    const teams = await TeamModel.find({})
=======
    try {
      const teams = await Team.find({});
>>>>>>> 57a9ac5 (fix: getting swagger working)

    Logger.debug(`Successfully retrieved ${teams.length} teams.`)

    return teams
  }

<<<<<<< HEAD
  public async getById(id: string): Promise<Team> {
    Logger.debug(`Retrieving a team by identifier ${id} ...`)

    const team = await TeamModel.findById(id)

    return team as Team
=======
  public async getById(id: number): Promise<ITeamDocument> {
    return await Team.findById(id) as ITeamDocument
>>>>>>> 57a9ac5 (fix: getting swagger working)
  }

  public async create(teamCreationParams: TeamCreationParams): Promise<ITeamDocument> {
    const newTeam = new Team(teamCreationParams)

    await newTeam.save()

    return newTeam
  }

<<<<<<< HEAD
  public async delete(id: string): Promise<void> {
    await TeamModel.deleteOne({_id: id})
=======
  public async delete(id: number): Promise<void> {
    await Team.deleteOne({_id: id})
>>>>>>> 57a9ac5 (fix: getting swagger working)

    return Promise.resolve();
  }
}
