import {beforeEach, describe, expect, test} from '@jest/globals';

import {KickOff} from '../../../src/common/events/KickOff';

describe('KickOff', () => {
    let kickOff: KickOff;

    beforeEach(() => {
        kickOff = new KickOff();
    });

    test('default constructor', () => {
        expect(kickOff.getTimestamp()).toBe(null);
    });

    test('setTimestamp updates timestamp', () => {
        const timestamp = new Date();

        kickOff.setTimestamp(timestamp);

        expect(kickOff.getTimestamp()).toBe(timestamp);
    });

    test('toString returns timestamp', () => {
        const timestamp = new Date();

        kickOff.setTimestamp(timestamp);

        expect(kickOff.toString()).toBe('Kick Off: ' + timestamp);
    });
});