import { Player } from "./Player";

export class Roster {
    players: Player[];

    constructor() {
        this.players = [];
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

    static create(players: Player[]): Roster {
        const roster: Roster = new Roster();

        players.forEach((player: Player) => {
            roster.addPlayer(player);
        });

        return roster;
    }
}
