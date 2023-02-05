import { IEvent } from "./IEvent";
import { Player } from "../Player";

export class Goal implements IEvent {
    private timestamp: Date;
    private scorer: Player;
    private assistedBy: Player[];

    constructor() {
        this.timestamp = null;
        this.scorer = null;
        this.assistedBy = [];
    }

    getTimestamp(): Date {
        return this.timestamp;
    }

    setTimestamp(timestamp: Date): void {
        this.timestamp = timestamp;
    }

    getScorer(): Player {
        return this.scorer;
    }

    setScorer(scorer: Player): void {
        this.scorer = scorer;
    }

    getAssistedBy(): Player[] {
        return this.assistedBy;
    }

    setAssistedBy(assistedBy: Player[]): void {
        this.assistedBy = assistedBy;
    }

    addAssistedBy(player: Player): void {
        this.assistedBy.push(player);
    }

    removeAssistedBy(player: Player): void {
        const index = this.assistedBy.indexOf(player);
        if (index > -1) {
            this.assistedBy.splice(index, 1);
        }
    }

    toString(): string {
        return "Goal: " + this.scorer.toString() + " " + this.timestamp;
    }
}