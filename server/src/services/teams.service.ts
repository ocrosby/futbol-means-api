import { Team, TeamModel } from "../models/team.model"

import Logger from '../utils/logger'

// A post request should not contain unneeded parameters
export type TeamCreationParams = Pick<Team, "name" | "season" | "owner">

export class TeamsService {
  public async getAll(): Promise<Team[]> {
    Logger.debug('Retrieving teams ...')

    try {
      const teams = await TeamModel.find({});

      return teams;
    } catch (e) {
      Logger.error(e)
    }

    return []
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
