import { Controller, Get, Route, Tags } from 'tsoa'

import * as utils from '../utils/mongoose'

@Route('health-check')
@Tags('Health')
export class HealthController extends Controller {
  @Get('/')
  public async checkHealth(): Promise<any> {
    this.setStatus(utils.isConnected() ? 200 : 500);

    return { msg: utils.getReadyStateMessage() }
  }
}
