import { ITeamDocument, Team } from "../models/team.model"

import Logger from '../utils/logger'

// A post request should not contain unneeded parameters
export type TeamCreationParams = Pick<ITeamDocument, "name" | "season" | "owner">



export class TeamsService {
  public async getAll(): Promise<ITeamDocument[]> {
    Logger.debug('Retrieving teams ...')

    try {
      const teams = await Team.find({});

      return teams;
    } catch (e) {
      Logger.error(e)
    }

    return []
  }

  public async getById(id: number): Promise<ITeamDocument> {
    return await Team.findById(id) as ITeamDocument
  }

  public async create(teamCreationParams: TeamCreationParams): Promise<ITeamDocument> {
    const newTeam = new Team(teamCreationParams)

    await newTeam.save()

    return newTeam
  }

  public async delete(id: number): Promise<void> {
    await Team.deleteOne({_id: id})

    return Promise.resolve();
  }
}
