import { ITeam, ITeamDocument } from "../models/team.model"

import { IPatchOperation } from "../interfaces/patch.interface";

import Team from '../models/team.model'

import Logger from '../utils/logger'
import jsonpatch from "jsonpatch";

// A post request should not contain unneeded parameters
export type TeamCreationParams = Pick<ITeamDocument, "name" | "season" | "owner">

async function get(id: string): Promise<ITeamDocument | null> {
  return Team.findOne({_id: id})
}

async function exists(name: string, season: string): Promise<boolean> {
  Logger.debug(`Checking to see if the team "${name}" exists with season "${season}"`)
  const team = await Team.findOne({ name: name, season: season })
  const found = !!team

  if (found) {
    Logger.debug('Found it.')
  } else {
    Logger.debug('Could not find it.')
  }

  return found
}

async function getAll(): Promise<ITeamDocument[]> {
  Logger.debug('Retrieving teams ...')

  const teams = await Team.find({})

  return teams;
}

async function addOne(teamCreationParams: ITeam): Promise<ITeamDocument> {
  const name = teamCreationParams.name;
  const season = teamCreationParams.season;

  Logger.debug('Adding a new team')

  const found = await exists(name, season);

  if (found) {
    Promise.reject(`A team "${name}" already exits for season "${season}"!`)
  }

  const newTeam = new Team(teamCreationParams);

  try {
    await newTeam.save();

    return newTeam;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function updateOne(id: string, data: ITeam): Promise<ITeamDocument | null> {
  Logger.debug('Updating a team')

  const result = await Team.replaceOne({_id: id}, { upsert: true })
  return result.matchedCount ? await get(id) : await await get(result.upsertedId.toString());
}

async function _delete(id: string): Promise<void> {
  Logger.debug('Deleting a team')

  await Team.deleteOne({ _id: id })

  return Promise.resolve()
}

async function patch(id: string, patches: IPatchOperation[]): Promise<void> {
  Logger.debug('Patching a team')

  const doc = await Team.findOne({ _id: id });

  if (!doc) {
    return Promise.reject(`Could not find a team with id ${id} when attempting patch a team!`)
  }

  const patchedDoc = jsonpatch.apply_patch(doc, patches)

  patchedDoc.save()

  return Promise.resolve()
}

export default {
  get,
  getAll,
  addOne,
  updateOne,
  patch,
  delete: _delete,
  exists
} as const;
