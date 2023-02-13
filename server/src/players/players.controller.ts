import express, { Router, Request, Response } from 'express';
import IPlayer from './player.interface'
import {Player, PlayerBuilder} from "./player.model";
import IController from "../controller.interface";

class PlayersController implements IController {
  public path = '/api/players';
  public router = Router();

  private players: IPlayer[] = [];

  constructor() {
    const builder: PlayerBuilder = new PlayerBuilder();

    builder.build();
    builder.buildName("player1");
    builder.buildPosition("Forward");
    builder.buildJerseyNumber(1);

    this.players.push(builder.getInstance());

    builder.build()
    builder.buildName("player2");
    builder.buildPosition("Midfielder");
    builder.buildJerseyNumber(2);

    this.players.push(builder.getInstance());

    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getPlayers.bind(this));
    this.router.post(this.path, this.createPlayer.bind(this));
  }

  public getPlayers(req: Request, res: Response) {
    res.send(this.players);
  }

  public createPlayer(req: Request, res: Response) {
    const team: IPlayer = req.body;

    this.players.push(team);
    res.send(team)
  }
}

export default PlayersController;
