import { IEvent } from "./IEvent";

export class HalfTime implements IEvent {
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
        return "Half Time: " + this.timestamp;
    }
}
