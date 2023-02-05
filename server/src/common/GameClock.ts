export class GameClock {
    private static instance: GameClock;

    private kickOff: Date;
    private halfTime: Date;
    private endOfMatch: Date;

    private constructor() {
        this.resetGame();
    }

    static getInstance(): GameClock { // Singleton
        if (!GameClock.instance) {
            GameClock.instance = new GameClock();
        }

        return GameClock.instance;
    }

    getCurrentTime(): Date {
        return new Date();
    }

    getKickOff(): Date {
        return this.kickOff;
    }

    private setKickOff(kickOff: Date): void {
        this.kickOff = kickOff;
    }

    getHalfTime(): Date {
        return this.halfTime;
    }

    private setHalfTime(halfTime: Date): void {
        this.halfTime = halfTime;
    }

    getEndOfMatch(): Date {
        return this.endOfMatch;
    }

    private setEndOfMatch(endOfMatch: Date): void {
        this.endOfMatch = endOfMatch;
    }

    startGame(): void {
        this.kickOff = this.getCurrentTime();
    }

    startHalfTime(): void {
        this.halfTime = this.getCurrentTime();
    }

    endGame(): void {
        this.endOfMatch = this.getCurrentTime();
    }

    resetGame(): void {
        this.kickOff = null;
        this.halfTime = null;
        this.endOfMatch = null;
    }

    toString(): string {
        return "Kick Off: " + this.kickOff + " Half Time: " + this.halfTime + " End of Match: " + this.endOfMatch;
    }
}