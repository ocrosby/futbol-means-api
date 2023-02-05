import {beforeEach, describe, expect, test} from '@jest/globals';

import {GameClock} from '../../src/common/GameClock';

describe('GameClock', () => {
    let gameClock: GameClock;

    beforeEach(() => {
        gameClock = GameClock.getInstance();
        gameClock.resetGame();
    });

    test('default constructor', () => {
        expect(gameClock.getKickOff()).toBe(null);
        expect(gameClock.getHalfTime()).toBe(null);
        expect(gameClock.getEndOfMatch()).toBe(null);
    });

    test('startGame updates kickOff', () => {
        gameClock.startGame();

        expect(gameClock.getKickOff()).not.toBe(null);
    });

    test('startHalfTime updates halfTime', () => {
        gameClock.startHalfTime();

        expect(gameClock.getHalfTime()).not.toBe(null);
    });

    test('endGame updates endOfMatch', () => {
        gameClock.endGame();

        expect(gameClock.getEndOfMatch()).not.toBe(null);
    });

    test('resetGame updates all times', () => {
        gameClock.startGame();
        gameClock.startHalfTime();
        gameClock.endGame();

        gameClock.resetGame();

        expect(gameClock.getKickOff()).toBe(null);
        expect(gameClock.getHalfTime()).toBe(null);
        expect(gameClock.getEndOfMatch()).toBe(null);
    });

    test('toString returns kickOff, halfTime, and endOfMatch', () => {
        gameClock.startGame();
        gameClock.startHalfTime();
        gameClock.endGame();

        expect(gameClock.toString()).toBe('Kick Off: ' + gameClock.getKickOff() + ' Half Time: ' + gameClock.getHalfTime() + ' End of Match: ' + gameClock.getEndOfMatch());
    });
});
