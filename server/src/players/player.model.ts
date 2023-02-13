import IPlayer from './player.interface';

export class Player implements IPlayer {
  public name: string;
  public jerseyNumber: number;
  public positions: string[];

  constructor() {
    this.name = '';
    this.jerseyNumber = 0;
    this.positions = [];
  }

  toString(): string {
    return this.name + ' #' + this.jerseyNumber;
  }
}

export class PlayerBuilder {
  private _instance: Player;

  constructor() {
    this._instance = null;
  }

  build(): PlayerBuilder {
    this._instance = new Player();

    return(this);
  }

  buildName(value: string): PlayerBuilder {
    this._instance.name = value;

    return(this);
  }

  buildJerseyNumber(value: number): PlayerBuilder {
    this._instance.jerseyNumber = value;

    return(this);
  }

  buildPosition(value: string): PlayerBuilder {
    this._instance.positions.push(value);

    return(this);
  }

  getInstance(): Player {
    return this._instance;
  }
}
