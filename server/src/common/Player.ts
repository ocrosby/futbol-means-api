export class Player {
    private name: string;
    private jerseyNumber: number;
    private position: string;

    constructor() {
        this.name = null;
        this.jerseyNumber = null;
        this.position = null;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getJerseyNumber(): number {
        return this.jerseyNumber;
    }

    setJerseyNumber(jerseyNumber: number): void {
        this.jerseyNumber = jerseyNumber;
    }

    getPosition(): string {
        return this.position;
    }

    setPosition(position: string): void {
        this.position = position;
    }

    toString(): string {
        return this.name + " " + this.jerseyNumber + " " + this.position;
    }
}
