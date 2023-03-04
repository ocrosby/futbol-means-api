import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Delete,
  Route,
  Tags,
  SuccessResponse
} from 'tsoa'

import { Event } from "../models/event.model"
import { EventService, EventCreationParams } from "../services/events.service";


@Route('api/events')
@Tags('Event')
export class EventsController extends Controller {
  @Get('/')
  public async getEvents(): Promise<Event[]> {
    return new EventService().getAll()
  }

  @Get("{eventId}")
  public async getEvent(
    @Path() eventId: string
  ): Promise<Event> {
    return new EventService().getById(eventId)
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createEvent(
    @Body() requestBody: EventCreationParams
  ): Promise<Event> {
    return await new EventService().create(requestBody)
  }

  @Delete("{eventId}")
  public async deleteEvent(
    @Path() eventId: string
  ): Promise<void> {
    await new EventService().delete(eventId)

    return
  }

}
