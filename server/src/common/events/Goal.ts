import { IEvent } from "./IEvent";
import { Player } from "../Player";

export class Goal implements IEvent {
    private timestamp: Date;
    private player: Player;
    private assistedBy: Player[];

    constructor() {
        this.timestamp = null;
        this.player = null;
        this.assistedBy = [];
    }

    getTimestamp(): Date {
        return this.timestamp;
    }

    setTimestamp(timestamp: Date): void {
        this.timestamp = timestamp;
    }

    getPlayer(): Player {
        return this.player;
    }

    setPlayer(scorer: Player): void {
        this.player = scorer;
    }

    getAssistedBy(): Player[] {
        return this.assistedBy;
    }

    setAssistedBy(assistedBy: Player[]): void {
        this.assistedBy = assistedBy;
    }

    wasAssistedBy(player: Player): boolean {
        return this.assistedBy.indexOf(player) > -1;
    }

    addAssistedBy(player: Player): void {
        if (this.wasAssistedBy(player)) {
            return;
        }

        this.assistedBy.push(player);
    }

    removeAssistedBy(player: Player): void {
        const index = this.assistedBy.indexOf(player);
        if (index > -1) {
            this.assistedBy.splice(index, 1);
        }
    }

    toString(): string {
        return "Goal: " + this.player.toString() + " " + this.timestamp;
    }
}