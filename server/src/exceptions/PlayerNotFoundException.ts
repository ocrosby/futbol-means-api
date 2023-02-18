import HttpException from "./HttpException";

class PlayerNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Player with id ${id} not found`);
  }
}

export default PlayerNotFoundException;
