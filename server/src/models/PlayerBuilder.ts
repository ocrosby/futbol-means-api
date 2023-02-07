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

    buildId(id: string): PlayerBuilder {
        this.instance.setId(id);

        return this;
    }

    buildName(name: string): PlayerBuilder {
        this.instance.setName(name);

        return this;
    }

    buildJerseyNumber(jerseyNumber: number): PlayerBuilder {
        this.instance.setJerseyNumber(jerseyNumber);

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
