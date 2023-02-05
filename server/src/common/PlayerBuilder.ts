import {Player} from './Player';

export class PlayerBuilder {
    private instance: Player;

    constructor() {
        this.instance = null;
    }

    build(): PlayerBuilder {
        this.instance = new Player();

        return this;
    }

    buildName(name: string): PlayerBuilder {
        this.instance.setName(name);

        return this;
    }

    buildJerseyNumber(jersey_number: number): PlayerBuilder {
        this.instance.setJerseyNumber(jersey_number);

        return this;
    }

    buildPosition(position: string): PlayerBuilder {
        this.instance.setPosition(position);

        return this;
    }

    getInstance(): Player {
        return this.instance;
    }
}
