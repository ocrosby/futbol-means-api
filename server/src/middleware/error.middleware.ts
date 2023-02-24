
import { type NextFunction, type Request, type Response } from 'express'
import type HttpException from '../exceptions/HttpException'

function errorMiddleware (error: HttpException, request: Request, response: Response, _next: NextFunction): void {
  const status: number = Number.isNaN(error.status) ? 500 : error.status
  const message: string = (error.message == null) ? error.message : 'Something went wrong'

  response
    .status(status)
    .send({
      status,
      message
    })
}

export default errorMiddleware
