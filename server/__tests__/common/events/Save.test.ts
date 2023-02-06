import {beforeEach, describe, expect, test} from '@jest/globals';

import {Player} from '../../../src/common/Player';
import {Save} from '../../../src/common/events/Save';

describe('Save', () => {
    let save: Save;

    beforeEach(() => {
        save = new Save();
    });

    test('default constructor', () => {
        expect(save.getTimestamp()).toBe(null);
        expect(save.getPlayer()).toBe(null);
    });

    test('setTimestamp updates timestamp', () => {
        const timestamp = new Date();

        save.setTimestamp(timestamp);

        expect(save.getTimestamp()).toBe(timestamp);
    });

    test('setPlayer updates player', () => {
        const player = new Player();

        save.setPlayer(player);

        expect(save.getPlayer()).toBe(player);
    });

    test('toString returns timestamp and player', () => {
        const timestamp = new Date();
        const player = new Player();

        save.setTimestamp(timestamp);
        save.setPlayer(player);

        expect(save.toString()).toBe('Save: ' + player.toString() + ' ' + timestamp);
    });
});
