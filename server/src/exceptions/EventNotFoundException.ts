import HttpException from "./HttpException";

class EventNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Player with id ${id} not found`);
  }
}

export default EventNotFoundException;
