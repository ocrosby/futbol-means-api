import { IEvent } from "./IEvent";
import { Player } from "../Player";

export class ThrowIn implements IEvent {
    private timestamp: Date;
    private player: Player;

    constructor() {
        this.timestamp = null;
        this.player = null;
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

    setPlayer(player: Player): void {
        this.player = player;
    }

    toString(): string {
        return "ThrowIn: " + this.player.toString() + " " + this.timestamp;
    }
}