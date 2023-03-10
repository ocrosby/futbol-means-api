import { IEvent, IEventDocument } from "../models/event.model";

import { IPatchOperation } from "../interfaces/patch.interface"

import Event from '../models/event.model'

import Logger from '../utils/logger'
import jsonpatch from "jsonpatch"

async function get(id: string): Promise<IEventDocument | null> {
  return Event.findOne({_id: id})
}

async function getAll(): Promise<IEventDocument[]> {
  Logger.debug('Retrieving events ...')

  return await Event.find({})
}

async function exists(id: string): Promise<boolean> {
  Logger.debug(`Checking to see if an event "${id}" exists.`)

  const event = await Event.findOne({ _id: id })
  const found = !!event

  if (found) {
    Logger.debug('Found it.')
  } else {
    Logger.debug('Could not find it.')
  }

  return found
}

async function addOne(eventCreationParams: IEvent): Promise<IEventDocument> {
  Logger.debug('Adding a new event')

  const newEvent = new Event(eventCreationParams);

  try {
    await newEvent.save();

    return newEvent;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function updateOne(id: string, data: IEvent): Promise<IEventDocument | null> {
  Logger.debug('Updating an event')

  const result = await Event.replaceOne({ _id: id }, { upsert: true })
  return result.matchedCount ? await get(id) : await get(result.upsertedId.toString())
}

async function _delete(id: string): Promise<void> {
  Logger.debug('Deleting an event')

  await Event.deleteOne({ _id: id })

  return Promise.resolve()
}

async function patch(id: string, patches: IPatchOperation[]): Promise<void> {
  Logger.debug('Patching an event')

  const doc = await Event.findOne({ _id: id });

  if (!doc) {
    return Promise.reject(`Could not find an event with id ${id} when attempting patch an event!`)
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
