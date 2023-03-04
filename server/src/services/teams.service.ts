import { Team, TeamModel } from "../models/team.model"
import Logger from '../utils/logger'

// A post request should not contain unneeded parameters
export type TeamCreationParams = Pick<Team, "name" | "season" | "owner">

export class TeamsService {
  public async getAll(): Promise<Team[]> {
    Logger.debug('Retrieving teams ...')

    const teams = await TeamModel.find({})

    Logger.debug(`Successfully retrieved ${teams.length} teams.`)

    return teams
  }

  public async getById(id: string): Promise<Team> {
    Logger.debug(`Retrieving a team by identifier ${id} ...`)

    const team = await TeamModel.findById(id)

    return team as Team
  }

  public async create(teamCreationParams: TeamCreationParams): Promise<Team> {
    const newTeam = new TeamModel(teamCreationParams)

    await newTeam.save()

    return newTeam
  }

  public async delete(id: string): Promise<void> {
    await TeamModel.deleteOne({_id: id})

    return Promise.resolve();
  }
}
