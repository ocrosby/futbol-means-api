import {beforeEach, describe, expect, test} from '@jest/globals';

import {Player} from '../../../src/common/Player';
import {Foul} from '../../../src/common/events/Foul';

describe('Foul', () => {
    let foul: Foul;

    beforeEach(() => {
        foul = new Foul();
    });

    test('default constructor', () => {
        expect(foul.getTimestamp()).toBe(null);
        expect(foul.getPlayer()).toBe(null);
    });

    test('setTimestamp updates timestamp', () => {
        const timestamp = new Date();

        foul.setTimestamp(timestamp);

        expect(foul.getTimestamp()).toBe(timestamp);
    });

    test('setPlayer updates player', () => {
        const player = new Player();

        foul.setPlayer(player);

        expect(foul.getPlayer()).toBe(player);
    });

    test('toString returns timestamp and player', () => {
        const timestamp = new Date();
        const player = new Player();

        foul.setTimestamp(timestamp);
        foul.setPlayer(player);

        expect(foul.toString()).toBe('Foul: ' + player.toString() + ' ' + timestamp);
    });
});