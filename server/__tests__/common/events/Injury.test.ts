import {beforeEach, describe, expect, test} from '@jest/globals';

import {Player} from '../../../src/common/Player';
import {Injury} from '../../../src/common/events/Injury';

describe('Injury', () => {
    let injury: Injury;

    beforeEach(() => {
        injury = new Injury();
    });

    test('default constructor', () => {
        expect(injury.getTimestamp()).toBe(null);
        expect(injury.getPlayer()).toBe(null);
    });

    test('setTimestamp updates timestamp', () => {
        const timestamp = new Date();

        injury.setTimestamp(timestamp);

        expect(injury.getTimestamp()).toBe(timestamp);
    });

    test('setPlayer updates player', () => {
        const player = new Player();

        injury.setPlayer(player);

        expect(injury.getPlayer()).toBe(player);
    });

    test('toString returns timestamp and player', () => {
        const timestamp = new Date();
        const player = new Player();

        injury.setTimestamp(timestamp);
        injury.setPlayer(player);

        expect(injury.toString()).toBe('Injury: ' + player.toString() + ' ' + timestamp);
    });
});
