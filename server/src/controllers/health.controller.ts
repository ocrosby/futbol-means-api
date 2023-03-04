import { Controller, Get, Route } from 'tsoa'

@Route('api/health-check')
export class HealthCheckController extends Controller {
  @Get('/')
  public async checkHealth() {
    return { msg: 'Hello'}
  }
}
