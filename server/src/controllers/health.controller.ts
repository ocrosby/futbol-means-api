import { Controller, Get, Route, Tags } from 'tsoa'

import {getReadyState, translateReadyState} from "../utils/mongoose";

@Route('health-check')
@Tags('Health')
export class HealthController extends Controller {
  @Get('/')
  public async checkHealth(): Promise<any> {
    const readyState: number = getReadyState();

    this.setStatus(readyState === 1 ? 200 : 500);

    return { msg: translateReadyState(readyState) }
  }
}
