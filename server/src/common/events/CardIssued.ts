import { IEvent } from "./IEvent";
import { Player } from "../Player";
import { CardTypes } from "../CardTypes";

export class CardIssued implements IEvent {
    private timestamp: Date;
    private player: Player;
    private cardType: CardTypes;

    constructor() {
        this.timestamp = null;
        this.player = null;
        this.cardType = null;
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

    getCardType(): CardTypes {
        return this.cardType;
    }

    setCardType(card: CardTypes): void {
        this.cardType = card;
    }

    toString(): string {
        return "Card Issued: " + this.player.toString() + " " + this.timestamp;
    }
}