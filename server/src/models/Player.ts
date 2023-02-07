export interface IPlayer {
    id: string;
    name: string;
    jerseyNumber: number;
    positions: string[];
}

export interface PlayerCreationParams {
    name: string;
    jerseyNumber: number;
    positions: string[];
}

export class Player implements IPlayer {
    id: string;
    name: string;
    jerseyNumber: number;
    positions: string[];

    constructor() {
        this.id = null;
        this.name = null;
        this.jerseyNumber = null;
        this.positions = [];
    }

    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
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

    getPositions(): string[] {
        return this.positions;
    }

    hasPosition(position: string): boolean {
        return this.positions.indexOf(position) > -1;
    }

    addPosition(position: string): void {
        this.positions.push(position);
    }

    removePosition(position: string): void {
        const index = this.positions.indexOf(position);

        if (index > -1) {
            this.positions.splice(index, 1);
        }

        return;
    }

    toString(): string {
        return this.name + " " + this.jerseyNumber + " " + this.positions.join(", ");
    }
}
