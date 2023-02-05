class BaseEvent {
    timestamp: Date;

    constructor(timestamp: Date) {
        this.timestamp = timestamp;
    }

    getTimestamp(): Date {  // getter
        return this.timestamp;
    }

    setTimestamp(timestamp: Date): void {  // setter
        this.timestamp = timestamp;
    }
}

class GoalEvent extends BaseEvent {
    team: string;
    player: string;

    constructor(timestamp: Date, team: string, player: string) {
        super(timestamp);
        this.team = team;
        this.player = player;
    }

    getTeam(): string {
        return this.team;
    }

    setTeam(team: string): void {
        this.team = team;
    }

    getPlayer(): string {
        return this.player;
    }

    setPlayer(player: string): void {
        this.player = player;
    }
}