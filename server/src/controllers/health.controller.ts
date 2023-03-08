import { Controller, Get, Route, Tags } from 'tsoa'

@Route('health-check')
@Tags('Health')
export class HealthController extends Controller {
  @Get('/')
  public async checkHealth(): Promise<any> {
    this.setStatus(200);

    return { msg: "Hello" }
  }
}
