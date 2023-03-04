import { Controller, Get, Route } from 'tsoa'

import Logger from '../utils/logger'

@Route('api/logger')
export class LoggerController extends Controller {
  @Get('/')
  public async index() {
    Logger.error("This is an error log");
    Logger.warn("This is a warn log");
    Logger.info("This is a info log");
    Logger.http("This is a http log");
    Logger.debug("This is a debug log");

    return { msg: 'Hello World!'}
  }
}
