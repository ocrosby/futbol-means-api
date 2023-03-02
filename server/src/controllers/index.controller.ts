import { Controller, Get, Route } from 'tsoa'
import {provideSingleton} from "../utils/provideSingleton";

@Route('api/index')
@provideSingleton(IndexController)
export class IndexController extends Controller {
  @Get('/')
  public async index() {
    return { msg: 'Hello World!'}
  }

  @Get('/msg')
  public msg() {
    return { msg: 'This is a message' }
  }
}
