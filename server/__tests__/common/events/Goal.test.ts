import {beforeEach, describe, expect, test} from '@jest/globals';

import {Player} from '../../../src/common/Player';
import {PlayerBuilder} from '../../../src/common/PlayerBuilder';
import {Goal} from '../../../src/common/events/Goal';

describe('Goal', () => {
    let goal: Goal;

    beforeEach(() => {
        goal = new Goal();
    });

    test('default constructor', () => {
        expect(goal.getTimestamp()).toBe(null);
        expect(goal.getPlayer()).toBe(null);
        expect(goal.getAssistedBy().length).toBe(0);
    });

    test('setTimestamp updates timestamp', () => {
        const timestamp = new Date();

        goal.setTimestamp(timestamp);

        expect(goal.getTimestamp()).toBe(timestamp);
    });

    test('setPlayer updates player', () => {
        const player = new Player();

        goal.setPlayer(player);

        expect(goal.getPlayer()).toBe(player);
    });

    test('addAssistedBy adds player', () => {
        const player = new Player();

        goal.addAssistedBy(player);

        expect(goal.getAssistedBy().length).toBe(1);
        expect(goal.getAssistedBy()[0]).toBe(player);
    });

    test('addAssistedBy adds multiple players', () => {
        const builder = new PlayerBuilder();
        const player1 = builder.build().buildName('Player 1').getInstance();
        const player2 = builder.build().buildName('Player 2').getInstance();

        goal.addAssistedBy(player1);
        goal.addAssistedBy(player2);

        expect(goal.getAssistedBy().length).toBe(2);
        expect(goal.getAssistedBy()[0]).toBe(player1);
        expect(goal.getAssistedBy()[1]).toBe(player2);
    });

    test('setAssistedBy sets players', () => {
        const builder = new PlayerBuilder();
        const player1 = builder.build().buildName('Player 1').getInstance();
        const player2 = builder.build().buildName('Player 2').getInstance();

        goal.setAssistedBy([player1, player2]);

        expect(goal.getAssistedBy().length).toBe(2);
        expect(goal.getAssistedBy()[0]).toBe(player1);
        expect(goal.getAssistedBy()[1]).toBe(player2);
    });

    test('addAssistedBy does not add duplicate players', () => {
        const builder = new PlayerBuilder()
        const player = builder.build().buildName('Player').getInstance();

        goal.addAssistedBy(player);
        goal.addAssistedBy(player);

        expect(goal.getAssistedBy().length).toBe(1);
        expect(goal.getAssistedBy()[0]).toBe(player);
    });

    test('removeAssistedBy removes player', () => {
        const player = new Player();

        goal.addAssistedBy(player);

        expect(goal.getAssistedBy().length).toBe(1);

        goal.removeAssistedBy(player);

        expect(goal.getAssistedBy().length).toBe(0);
    });

    test('toString returns timestamp and player', () => {
        const timestamp = new Date();
        const player = new Player();

        goal.setTimestamp(timestamp);
        goal.setPlayer(player);

        expect(goal.toString()).toBe('Goal: ' + player.toString() + ' ' + timestamp);
    });
});