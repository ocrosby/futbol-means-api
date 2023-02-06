import {beforeEach, describe, expect, test} from '@jest/globals';

import {Player} from '../../../src/common/Player';
import {CornerKick} from '../../../src/common/events/CornerKick';

describe('CornerKick', () => {
    let cornerKick: CornerKick;

    beforeEach(() => {
        cornerKick = new CornerKick();
    });

    test('default constructor', () => {
        expect(cornerKick.getTimestamp()).toBe(null);
        expect(cornerKick.getPlayer()).toBe(null);
    });

    test('setTimestamp updates timestamp', () => {
        const timestamp = new Date();

        cornerKick.setTimestamp(timestamp);

        expect(cornerKick.getTimestamp()).toBe(timestamp);
    });

    test('setPlayer updates player', () => {
        const player = new Player();

        cornerKick.setPlayer(player);

        expect(cornerKick.getPlayer()).toBe(player);
    });

    test('toString returns timestamp and player', () => {
        const timestamp = new Date();
        const player = new Player();

        cornerKick.setTimestamp(timestamp);
        cornerKick.setPlayer(player);

        expect(cornerKick.toString()).toBe('Corner Kick: ' + player.toString() + ' ' + timestamp);
    });
});