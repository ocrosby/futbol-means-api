import {
  Body,
  Controller,
  Get,
  Put,
  Path,
  Post,
  Patch,
  Delete,
  Route,
  Tags,
  SuccessResponse
} from 'tsoa'

import { IEvent, IEventDocument } from "../models/event.model"
import EventsService from "../services/events.service";
import {IPatchOperation} from "../interfaces/patch.interface";


@Route('api/events')
@Tags('Event')
export class EventsController extends Controller {
  @Get('/')
  public async getEvents(): Promise<IEventDocument[]> {
    return EventsService.getAll()
  }

  @Get("{id}")
  public async getEvent(
    @Path() id: string
  ): Promise<IEventDocument | null> {
    return await EventsService.get(id)
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createEvent(
    @Body() requestBody: IEvent
  ): Promise<IEventDocument | null> {
    return await EventsService.addOne(requestBody)
  }

  @Put('{id}')
  public async updateEvent(
    @Path() id: string,
    @Body() requestBody: IEvent
  ): Promise<IEventDocument | null> {
    return await EventsService.updateOne(id, requestBody)
  }

  @Delete("{id}")
  public async deleteEvent(
    @Path() id: string
  ): Promise<void> {
    await EventsService.delete(id)

    return
  }

  @Patch('{id}')
  public async patchEvent (
    @Path() id: string,
    @Body() requestBody: IPatchOperation[]
  ): Promise<void> {
    await EventsService.patch(id, requestBody)

    return Promise.resolve()
  }

}
