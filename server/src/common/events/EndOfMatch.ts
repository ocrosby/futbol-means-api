import { IEvent } from "./IEvent";


export class EndOfMatch implements IEvent {
    private timestamp: Date;

    constructor() {
        this.timestamp = null;
    }

    getTimestamp(): Date {
        return this.timestamp;
    }

    setTimestamp(timestamp: Date): void {
        this.timestamp = timestamp;
    }

    toString(): string {
        return "End of Match: " + this.timestamp;
    }
}
