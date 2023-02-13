import express, { Router, Request, Response } from 'express';
import ITeam from './team.interface'
import IController from "../controller.interface";

class TeamsController implements IController {
  public path = '/api/teams';
  public router = Router();

  private teams: ITeam[] = [
    {
      name: 'Team1'
    },
    {
      name: 'Team2'
    }
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getTeams.bind(this));
    this.router.post(this.path, this.createTeam.bind(this));
  }

  public getTeams(req: Request, res: Response) {
    res.send(this.teams);
  }

  public createTeam(req: Request, res: Response) {
    const team: ITeam = req.body;

    this.teams.push(team);
    res.send(team)
  }
}

export default TeamsController;
