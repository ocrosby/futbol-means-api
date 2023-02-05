export class Player {
    private name: string;
    private jersey_number: number;
    private position: string;

    constructor() {
        this.name = null;
        this.jersey_number = null;
        this.position = null;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getJerseyNumber(): number {
        return this.jersey_number;
    }

    setJerseyNumber(jersey_number: number): void {
        this.jersey_number = jersey_number;
    }

    getPosition(): string {
        return this.position;
    }

    setPosition(position: string): void {
        this.position = position;
    }

    toString(): string {
        return this.name + " " + this.jersey_number + " " + this.position;
    }
}


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