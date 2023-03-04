import { Event, EventModel } from '../models/event.model'
import Logger from '../utils/logger'

// A post request should not contain unneded parameters
export type EventCreationParams = Pick<Event, "type" | "timestamp" | "meta">

export class EventService {
  public async create(eventCreationParams: EventCreationParams): Promise<Event> {
    const newEvent = new EventModel(eventCreationParams);

    await newEvent.save()

    return newEvent
  }

  public async getAll(): Promise<Event[]> {
    Logger.debug('Retrieving events ...')

    const events = await EventModel.find({})

    Logger.debug(`Successfully retrieved ${events.length} events.`)

    return events;
  }

  public async getById(id: string): Promise<Event> {
    Logger.debug(`Retrieving an event by identifier ${id} ...`)

    const event = await EventModel.findById(id)

    return event as Event
  }

  public async delete(id: string): Promise<void> {
    await EventModel.deleteOne({_id: id})

    return Promise.resolve()
  }
}
