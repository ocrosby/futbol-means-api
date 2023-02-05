import { Player } from "./Player";

export class Roster {
    players: Player[];

    constructor(players: Player[]) {
        if (players === undefined)
            this.players = [];
        else
            this.players = players;
    }

    getPlayers(): Player[] {
        return this.players;
    }

    setPlayers(players: Player[]): void {
        this.players = players;
    }

    addPlayer(player: Player): void {
        this.players.push(player);
    }

    removePlayer(player: Player): void {
        this.players = this.players.filter(p => p !== player);
    }
}
