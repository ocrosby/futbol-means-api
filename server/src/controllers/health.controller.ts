import { Controller, Get, Route, Tags } from 'tsoa'

import mongoose from 'mongoose'

@Route('health-check')
@Tags('Health')
export class HealthController extends Controller {
  @Get('/')
  public async checkHealth() {
    let state: string;

    switch(mongoose.connection.readyState) {
      case 0:
        state = 'disconnected'
        break
      case 1:
        state = 'connected'
        break
      case 2:
        state = 'connecting'
        break
      case 3:
        state = 'disconnecting'
        break
      default:
        state = 'unknown'
    }


    if (mongoose.connection.readyState === 1) {
      // connected
      this.setStatus(200);
    } else {
      this.setStatus(500);
    }

    return { msg: state }
  }
}
